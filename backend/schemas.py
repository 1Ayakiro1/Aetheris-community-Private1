from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ArticleBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    author: str = "Anonymous"
    tags: List[str] = []
    status: str = "published"

class ArticleCreate(ArticleBase):
    pass

class ReactionRequest(BaseModel):
    user_id: int
    reaction: str

class Article(ArticleBase):
    id: int
    created_at: datetime
    likes: int = 0
    dislikes: int = 0
    comments_count: int = 0
    user_reaction: Optional[str] = None

    class Config:
        from_attributes = True
