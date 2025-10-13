from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
from backend import models, schemas, crud, database
from backend.routers import articles, auth

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.include_router(articles.router)
app.include_router(auth.router)

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
