from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ArticleBase(BaseModel):
    title: str
    content: str
    author: str = "Anonymous"
    tags: List[str] = []
    status: str = "published"
    difficulty: str = "medium"
    preview_image: Optional[str] = None

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

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserStats(BaseModel):
    articles_count: int
    comments_count: int
    join_date: datetime

# Comments

class CommentBase(BaseModel):
    text: str
    parent_id: Optional[int] = None
    author_id: Optional[int] = None
    author_name: Optional[str] = "Guest"

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    article_id: int
    created_at: datetime
    likes: int = 0
    dislikes: int = 0
    user_reaction: Optional[str] = None  # 'like', 'dislike' или None

    class Config:
        from_attributes = True

# Comment reactions
class CommentReactionPayload(BaseModel):
    user_id: int
    reaction: str  # 'like' or 'dislike'

# Notifications
class NotificationBase(BaseModel):
    type: str
    title: str
    message: str
    related_article_id: Optional[int] = None
    related_comment_id: Optional[int] = None

class NotificationCreate(NotificationBase):
    user_id: int

class Notification(NotificationBase):
    id: int
    user_id: int
    is_read: int = 0
    created_at: datetime

    class Config:
        from_attributes = True

# Схемы настроек уведомлений удалены - используем фиксированные пороги

# Article Like Thresholds
class ArticleLikeThresholdBase(BaseModel):
    article_id: int
    user_id: int
    threshold: int

class ArticleLikeThresholdCreate(ArticleLikeThresholdBase):
    pass

class ArticleLikeThreshold(ArticleLikeThresholdBase):
    id: int
    reached_at: datetime

    class Config:
        from_attributes = True
