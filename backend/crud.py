from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas
import json

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#auth

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    # bcrypt поддерживает только до 72байт потому пришлосьь обрезать но я хз с чем это связано потому что пароль явно не 72 байта
    safe_password = user.password[:72]
    hashed_password = pwd_context.hash(safe_password)
    db_user = models.User(username=user.username, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain_password, hashed_password):
    safe_password = plain_password[:72]
    return pwd_context.verify(safe_password, hashed_password)

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
    return db_comment

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
