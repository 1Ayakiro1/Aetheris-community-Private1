from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db
from pydantic import BaseModel

router = APIRouter()

class ReactionPayload(BaseModel):
    user_id: int
    reaction: str

@router.post("/articles/{article_id}/react", response_model=schemas.Article)
def react_article_route(article_id: int, payload: ReactionPayload, db: Session = Depends(get_db)):
    article = crud.react_article(db, article_id, payload.user_id, payload.reaction)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.get("/articles/", response_model=list[schemas.Article])
def read_articles(skip: int = 0, limit: int = 100, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    return crud.get_articles(db, skip=skip, limit=limit, user_id=user_id)

@router.get("/articles/search", response_model=list[schemas.Article])
def search_articles_route(q: str, skip: int = 0, limit: int = 100, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Поиск статей по тексту"""
    if not q or len(q.strip()) < 2:
        return []
    return crud.search_articles(db, q.strip(), skip=skip, limit=limit, user_id=user_id)

@router.get("/articles/{article_id}", response_model=schemas.Article)
def read_article(article_id: int, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    db_article = crud.get_article_with_user(db, article_id, user_id=user_id)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Not found")
    return db_article

@router.post("/articles/", response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    return crud.create_article(db=db, article=article)

# comments

@router.get("/articles/{article_id}/comments", response_model=list[schemas.Comment])
def list_comments(article_id: int, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    return crud.get_comments_by_article(db, article_id, user_id=user_id)

@router.post("/articles/{article_id}/comments", response_model=schemas.Comment)
def create_comment(article_id: int, payload: schemas.CommentCreate, db: Session = Depends(get_db)):
    c = crud.create_comment(db, article_id, payload)
    if not c:
        raise HTTPException(status_code=404, detail="Article not found")
    return c

@router.post("/comments/{comment_id}/react", response_model=schemas.Comment)
def react_comment_route(comment_id: int, payload: schemas.CommentReactionPayload, db: Session = Depends(get_db)):
    comment = crud.react_comment(db, comment_id, payload.user_id, payload.reaction)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment
