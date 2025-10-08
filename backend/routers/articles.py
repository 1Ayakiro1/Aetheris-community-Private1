from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
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

@router.get("/articles/{article_id}", response_model=schemas.Article)
def read_article(article_id: int, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    db_article = crud.get_article_with_user(db, article_id, user_id=user_id)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Not found")
    return db_article

@router.post("/articles/", response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    return crud.create_article(db=db, article=article)
