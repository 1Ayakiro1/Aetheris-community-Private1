from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import get_db

router = APIRouter()

@router.post("/articles/{article_id}/like")
def like_article(article_id: int, db: Session = Depends(get_db)):
    article = crud.get_article(db, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    article.likes += 1
    db.commit()
    db.refresh(article)
    return {"likes": article.likes}


@router.post("/articles/{article_id}/dislike")
def dislike_article(article_id: int, db: Session = Depends(get_db)):
    article = crud.get_article(db, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    article.dislikes += 1
    db.commit()
    db.refresh(article)
    return {"dislikes": article.dislikes}
