from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Optional
from backend import models, schemas, crud, database
from backend.routers import articles, auth, notifications

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.include_router(articles.router)
app.include_router(auth.router)
app.include_router(notifications.router)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

import os

# CORS configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (frontend)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve frontend for all non-API routes
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    # If it's an API route, let it pass through
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    
    # Serve index.html for all other routes (SPA routing)
    return FileResponse("static/index.html")
