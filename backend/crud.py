from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from passlib.context import CryptContext
from backend import models, schemas
import json

# Switch to PBKDF2-SHA256 to avoid bcrypt backend issues on macOS and 72-byte limits
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def _truncate_bcrypt_password(password: str) -> str:
    # bcrypt ограничивает пароль 72 байтами (после энкодинга)
    # отрезаем по байтам, а не по символам, чтобы избежать ValueError
    b = (password or "").encode("utf-8")[:72]
    return b.decode("utf-8", errors="ignore")

#auth

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password or "")
    db_user = models.User(username=user.username, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password or "", hashed_password)

def get_user_stats(db: Session, user_id: int):
    # Получаем пользователя для получения username
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return {
            "articles_count": 0,
            "comments_count": 0,
            "join_date": None
        }
    
    # Получаем количество статей пользователя (по username, так как author хранится как строка)
    articles_count = db.query(models.Article).filter(models.Article.author == user.username).count()
    
    # Получаем количество комментариев пользователя
    comments_count = db.query(models.Comment).filter(models.Comment.author_id == user_id).count()
    
    return {
        "articles_count": articles_count,
        "comments_count": comments_count,
        "join_date": user.created_at
    }

def get_user_articles(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    # Получаем пользователя для получения username
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return []
    
    # Получаем статьи пользователя (по username, так как author хранится как строка)
    articles = db.query(models.Article).filter(models.Article.author == user.username).offset(skip).limit(limit).all()
    for a in articles:
        a.tags = a.tags.split(",") if a.tags else []
    return articles

#счтатьи

def get_article(db: Session, article_id: int):
    return db.query(models.Article).filter(models.Article.id == article_id).first()

def create_article(db: Session, article: schemas.ArticleCreate):
    db_article = models.Article(
        title=article.title,
        content=article.content,
        author=article.author,
        tags=",".join(article.tags) if isinstance(article.tags, list) else article.tags,
        status=article.status,
        difficulty=article.difficulty,
        preview_image=article.preview_image
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)

    db_article.tags = db_article.tags.split(",") if db_article.tags else []
    return db_article

def get_articles(db: Session, skip: int = 0, limit: int = 100, user_id: int | None = None):
    articles = db.query(models.Article).offset(skip).limit(limit).all()
    for a in articles:
        a.tags = a.tags.split(",") if a.tags else []
        if user_id is not None:
            r = db.query(models.ArticleReaction).filter(
                models.ArticleReaction.article_id == a.id,
                models.ArticleReaction.user_id == user_id
            ).first()
            a.user_reaction = r.reaction if r else None
    return articles

def search_articles(db: Session, query: str, skip: int = 0, limit: int = 100, user_id: int | None = None):
    """Поиск статей по заголовку, содержимому и тегам"""
    from sqlalchemy import or_
    
    # Создаем поисковый запрос
    search_filter = or_(
        models.Article.title.ilike(f"%{query}%"),
        models.Article.content.ilike(f"%{query}%"),
        models.Article.tags.ilike(f"%{query}%"),
        models.Article.author.ilike(f"%{query}%")
    )
    
    articles = db.query(models.Article).filter(search_filter).offset(skip).limit(limit).all()
    
    for a in articles:
        a.tags = a.tags.split(",") if a.tags else []
        if user_id is not None:
            r = db.query(models.ArticleReaction).filter(
                models.ArticleReaction.article_id == a.id,
                models.ArticleReaction.user_id == user_id
            ).first()
            a.user_reaction = r.reaction if r else None
    return articles

def get_article_with_user(db: Session, article_id: int, user_id: int | None = None):
    a = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not a:
        return None
    a.tags = a.tags.split(",") if a.tags else []
    if user_id is not None:
        r = db.query(models.ArticleReaction).filter(
            models.ArticleReaction.article_id == a.id,
            models.ArticleReaction.user_id == user_id
        ).first()
        a.user_reaction = r.reaction if r else None
    return a

def delete_article(db: Session, article_id: int, user_id: int):
    """Удалить статью (только автор может удалить свою статью)"""
    # Получаем статью
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        return False
    
    # Получаем пользователя для проверки автора
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return False
    
    # Проверяем, что пользователь является автором статьи
    if article.author != user.username:
        return False
    
    # Удаляем связанные данные
    # Удаляем реакции на статью
    db.query(models.ArticleReaction).filter(models.ArticleReaction.article_id == article_id).delete()
    
    # Удаляем комментарии к статье
    db.query(models.Comment).filter(models.Comment.article_id == article_id).delete()
    
    # Удаляем уведомления связанные со статьей
    db.query(models.Notification).filter(models.Notification.related_article_id == article_id).delete()
    
    # Удаляем пороги лайков
    db.query(models.ArticleLikeThreshold).filter(models.ArticleLikeThreshold.article_id == article_id).delete()
    
    # Удаляем саму статью
    db.delete(article)
    db.commit()
    
    return True

def react_article(db: Session, article_id: int, user_id: int, reaction: str):
    article = get_article(db, article_id)
    if not article:
        return None

    existing = db.query(models.ArticleReaction).filter(
        models.ArticleReaction.article_id == article_id,
        models.ArticleReaction.user_id == user_id
    ).first()

    if existing:
        if existing.reaction == reaction:
            db.delete(existing)
            if reaction == 'like':
                article.likes = max(0, article.likes - 1)
            elif reaction == 'dislike':
                article.dislikes = max(0, article.dislikes - 1)
        else:
            prev = existing.reaction
            existing.reaction = reaction
            if prev == 'like':
                article.likes = max(0, article.likes - 1)
            elif prev == 'dislike':
                article.dislikes = max(0, article.dislikes - 1)

            if reaction == 'like':
                article.likes += 1
            elif reaction == 'dislike':
                article.dislikes += 1
    else:
        new = models.ArticleReaction(user_id=user_id, article_id=article_id, reaction=reaction)
        db.add(new)
        if reaction == 'like':
            article.likes += 1
        elif reaction == 'dislike':
            article.dislikes += 1

    db.commit()
    db.refresh(article)

    # Проверяем пороги лайков для уведомлений (только при добавлении лайка)
    if reaction == 'like' and (not existing or existing.reaction != 'like'):
        check_and_create_like_threshold_notification(db, article_id, article.likes)

    article.tags = article.tags.split(",") if article.tags else []
    r = db.query(models.ArticleReaction).filter(
        models.ArticleReaction.article_id == article_id,
        models.ArticleReaction.user_id == user_id
    ).first()
    article.user_reaction = r.reaction if r else None

    return article

# comments

def get_comments_by_article(db: Session, article_id: int, user_id: int | None = None):
    comments = db.query(models.Comment).filter(models.Comment.article_id == article_id).order_by(models.Comment.created_at.desc()).all()
    if user_id is not None:
        for c in comments:
            r = db.query(models.CommentReaction).filter(
                models.CommentReaction.comment_id == c.id,
                models.CommentReaction.user_id == user_id
            ).first()
            c.user_reaction = r.reaction if r else None
    return comments

def create_comment(db: Session, article_id: int, comment: schemas.CommentCreate):
    db_article = get_article(db, article_id)
    if not db_article:
        return None

    author_name = comment.author_name or "Guest"
    db_comment = models.Comment(
        article_id=article_id,
        parent_id=comment.parent_id,
        author_id=comment.author_id,
        author_name=author_name,
        text=comment.text,
    )
    db.add(db_comment)
    # update article comments_count (simple counter for now)
    db_article.comments_count = (db_article.comments_count or 0) + 1
    db.commit()
    db.refresh(db_comment)
    
    # Отправляем уведомления
    _send_comment_notifications(db, db_comment, db_article)
    
    return db_comment

def _send_comment_notifications(db: Session, comment: models.Comment, article: models.Article):
    """Отправить уведомления о новом комментарии"""
    
    # Если это ответ на комментарий, отправляем уведомление автору родительского комментария
    if comment.parent_id:
        parent_comment = db.query(models.Comment).filter(models.Comment.id == comment.parent_id).first()
        if parent_comment and parent_comment.author_id and parent_comment.author_id != comment.author_id:
            # Создаем уведомление для автора родительского комментария
            notification = schemas.NotificationCreate(
                user_id=parent_comment.author_id,
                type="comment_reply",
                title="Новый ответ на ваш комментарий",
                message=f"{comment.author_name} ответил на ваш комментарий",
                related_article_id=article.id,
                related_comment_id=comment.id
            )
            create_notification(db, notification)
    
    # Отправляем уведомление автору статьи только для корневых комментариев (не ответов)
    # и только если это не его комментарий
    if not comment.parent_id and article.author != comment.author_name:
        # Находим ID автора статьи по username
        article_author = db.query(models.User).filter(models.User.username == article.author).first()
        if article_author and article_author.id != comment.author_id:
            notification = schemas.NotificationCreate(
                user_id=article_author.id,
                type="article_comment",
                title="Новый комментарий к вашей статье",
                message=f"{comment.author_name} прокомментировал вашу статью \"{article.title}\"",
                related_article_id=article.id,
                related_comment_id=comment.id
            )
            create_notification(db, notification)

def get_comment(db: Session, comment_id: int):
    return db.query(models.Comment).filter(models.Comment.id == comment_id).first()

def react_comment(db: Session, comment_id: int, user_id: int, reaction: str):
    comment = get_comment(db, comment_id)
    if not comment:
        return None

    existing = db.query(models.CommentReaction).filter(
        models.CommentReaction.comment_id == comment_id,
        models.CommentReaction.user_id == user_id
    ).first()

    if existing:
        if existing.reaction == reaction:
            # Remove reaction (toggle off)
            db.delete(existing)
            if reaction == 'like':
                comment.likes = max(0, comment.likes - 1)
            elif reaction == 'dislike':
                comment.dislikes = max(0, comment.dislikes - 1)
        else:
            # Change reaction
            prev = existing.reaction
            existing.reaction = reaction
            if prev == 'like':
                comment.likes = max(0, comment.likes - 1)
            elif prev == 'dislike':
                comment.dislikes = max(0, comment.dislikes - 1)

            if reaction == 'like':
                comment.likes += 1
            elif reaction == 'dislike':
                comment.dislikes += 1
    else:
        # Add new reaction
        new = models.CommentReaction(user_id=user_id, comment_id=comment_id, reaction=reaction)
        db.add(new)
        if reaction == 'like':
            comment.likes += 1
        elif reaction == 'dislike':
            comment.dislikes += 1

    db.commit()
    db.refresh(comment)

    # Attach user_reaction to comment
    r = db.query(models.CommentReaction).filter(
        models.CommentReaction.comment_id == comment_id,
        models.CommentReaction.user_id == user_id
    ).first()
    comment.user_reaction = r.reaction if r else None

    return comment

# Notifications

def create_notification(db: Session, notification: schemas.NotificationCreate):
    """Создать новое уведомление"""
    db_notification = models.Notification(**notification.dict())
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def get_user_notifications(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    """Получить уведомления пользователя"""
    return db.query(models.Notification).filter(
        models.Notification.user_id == user_id
    ).order_by(models.Notification.created_at.desc()).offset(skip).limit(limit).all()

def mark_notification_as_read(db: Session, notification_id: int, user_id: int):
    """Отметить уведомление как прочитанное"""
    notification = db.query(models.Notification).filter(
        models.Notification.id == notification_id,
        models.Notification.user_id == user_id
    ).first()
    if notification:
        notification.is_read = 1
        db.commit()
        db.refresh(notification)
    return notification

def get_unread_notifications_count(db: Session, user_id: int):
    """Получить количество непрочитанных уведомлений"""
    return db.query(models.Notification).filter(
        models.Notification.user_id == user_id,
        models.Notification.is_read == 0
    ).count()

# Удалены функции настроек уведомлений - используем фиксированные пороги

# Article Like Thresholds - упрощенная версия с фиксированными порогами
def check_and_create_like_threshold_notification(db: Session, article_id: int, current_likes: int):
    """Проверить и создать уведомление о достижении порога лайков (упрощенная версия)"""
    
    # Фиксированные пороги лайков
    THRESHOLDS = [1, 5, 10, 25, 50, 100, 500, 1000]
    
    # Проверяем только если лайков достаточно для минимального порога
    if current_likes < 1:
        return
    
    # Получаем статью и автора одним запросом с JOIN
    result = db.query(models.Article, models.User).join(
        models.User, models.Article.author == models.User.username
    ).filter(models.Article.id == article_id).first()
    
    if not result:
        return
    
    article, author = result
    
    # Проверяем только достижимые пороги
    reachable_thresholds = [t for t in THRESHOLDS if current_likes >= t]
    if not reachable_thresholds:
        return
    
    # Проверяем существующие пороги одним запросом
    existing_thresholds = db.query(models.ArticleLikeThreshold.threshold).filter(
        models.ArticleLikeThreshold.article_id == article_id,
        models.ArticleLikeThreshold.threshold.in_(reachable_thresholds)
    ).all()
    
    existing_threshold_values = {t[0] for t in existing_thresholds}
    
    # Находим первый недостигнутый порог
    for threshold in sorted(reachable_thresholds):
        if threshold not in existing_threshold_values:
            # Создаем запись о достижении порога
            threshold_record = models.ArticleLikeThreshold(
                article_id=article_id,
                user_id=author.id,
                threshold=threshold
            )
            db.add(threshold_record)
            
            # Создаем уведомление
            notification = schemas.NotificationCreate(
                user_id=author.id,
                type="article_like_threshold",
                title="Новый порог лайков!",
                message=f"Ваша статья \"{article.title}\" получила {current_likes} лайков!",
                related_article_id=article_id
            )
            create_notification(db, notification)
            
            db.commit()
            break  # Отправляем только одно уведомление за раз
