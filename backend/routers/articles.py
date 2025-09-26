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
