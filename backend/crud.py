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
        tags=",".join(article.tags),
        status=article.status
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)

    db_article.tags = db_article.tags.split(",") if db_article.tags else []
    return db_article

def get_articles(db: Session, skip: int = 0, limit: int = 100):
    articles = db.query(models.Article).offset(skip).limit(limit).all()
    for a in articles:
        a.tags = a.tags.split(",") if a.tags else []
    return articles

def like_article(db: Session, article_id: int):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if article:
        article.likes += 1
        db.commit()
        db.refresh(article)
    return article

def dislike_article(db: Session, article_id: int):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if article:
        article.dislikes += 1
        db.commit()
        db.refresh(article)
    return article
