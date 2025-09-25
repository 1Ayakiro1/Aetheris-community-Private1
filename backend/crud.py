from sqlalchemy.orm import Session
from . import models, schemas
import json

def get_article(db: Session, article_id: int):
    return db.query(models.Article).filter(models.Article.id == article_id).first()

def create_article(db: Session, article: schemas.ArticleCreate):
    db_article = models.Article(
        title=article.title,
        content=article.content,
        excerpt=article.excerpt,
        author=article.author,
        tags=",".join(article.tags) if isinstance(article.tags, list) else article.tags,
        status=article.status
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
    """
    reaction: 'like' or 'dislike'
    логика:
      - если записи нет -> создаем + увеличиваем соответствующий счётчик
      - если запись есть и та же реакция -> удаляем запись (toggle off) и уменьшаем счётчик
      - если запись есть и другая реакция -> меняем запись и корректируем оба счётчика
    """
    article = get_article(db, article_id)
    if not article:
        return None

    existing = db.query(models.ArticleReaction).filter(
        models.ArticleReaction.article_id == article_id,
        models.ArticleReaction.user_id == user_id
    ).first()

    if existing:
        if existing.reaction == reaction:
            # toggle off
            db.delete(existing)
            if reaction == 'like':
                article.likes = max(0, article.likes - 1)
            elif reaction == 'dislike':
                article.dislikes = max(0, article.dislikes - 1)
        else:
            # switch reaction
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
        # new reaction
        new = models.ArticleReaction(user_id=user_id, article_id=article_id, reaction=reaction)
        db.add(new)
        if reaction == 'like':
            article.likes += 1
        elif reaction == 'dislike':
            article.dislikes += 1

    db.commit()
    db.refresh(article)

    # expose tags as list for response
    article.tags = article.tags.split(",") if article.tags else []
    # set user_reaction to current reaction present (or None if removed)
    r = db.query(models.ArticleReaction).filter(
        models.ArticleReaction.article_id == article_id,
        models.ArticleReaction.user_id == user_id
    ).first()
    article.user_reaction = r.reaction if r else None

    return article
