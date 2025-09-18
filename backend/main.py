from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# <--------------------> СТАТЬИ <--------------------> #
@app.post("/articles/", response_model=schemas.ArticleOut)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    db_article = models.Article(title=article.title, content=article.content)
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@app.get("/articles/", response_model=List[schemas.ArticleOut])
def get_articles(db: Session = Depends(get_db)):
    return db.query(models.Article).all()

# <--------------------> РЕГИСТРАЦИЯ <--------------------> #
