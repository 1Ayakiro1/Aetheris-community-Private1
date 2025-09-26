from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
from . import models, schemas, crud, database
from .routers import articles

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.include_router(articles.router)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #временно потом запихать origins но с ними не работает пока что на локалхосте
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# <--------------------> СТАТЬИ <--------------------> #
@app.get("/articles/", response_model=list[schemas.Article])
def read_articles(skip: int = 0, limit: int = 100, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    return crud.get_articles(db, skip=skip, limit=limit, user_id=user_id)

@app.get("/articles/{article_id}", response_model=schemas.Article)
def read_article(article_id: int, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    db_article = crud.get_article_with_user(db, article_id, user_id=user_id)
    if db_article is None:
        raise HTTPException(status_code=404, detail="Not found")
    return db_article

@app.post("/articles/", response_model=schemas.Article)
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    return crud.create_article(db=db, article=article)

