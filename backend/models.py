from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from backend.database import Base
import json

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String, nullable=False, default="Anonymous")
    tags = Column(String, nullable=True)
    preview_image = Column(String, nullable=True)  # Теперь тут будет преввьюшка. А excerpt убрал
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    status = Column(String, default="published")
    difficulty = Column(String, default="medium")  # easy, medium, hard
    likes = Column(Integer, default=0)
    dislikes = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)

    def get_tags_list(self):
        if self.tags:
            try:
                return json.loads(self.tags)
            except Exception:
                return self.tags.split(",")
        return []

    def set_tags_list(self, tags_list):
        self.tags = json.dumps(tags_list)

class ArticleReaction(Base):
    __tablename__ = "article_reactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False) #так как пока пользователей нет просто число храним НЕ ЗАБЫТЬ ИЗМЕНИТЬ
    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), nullable=False)
    reaction = Column(String, nullable=False)  #или лайк или дизлайк хотя можно потом и еще что нибудь добавить
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (UniqueConstraint('user_id', 'article_id', name='uix_user_article'),)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), nullable=False)
    parent_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)
    author_id = Column(Integer, nullable=True)  # временно, пока нет полноценной авторизации
    author_name = Column(String, nullable=False, default="Guest")
    text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    likes = Column(Integer, default=0)
    dislikes = Column(Integer, default=0)

class CommentReaction(Base):
    __tablename__ = "comment_reactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)  # анонимный user_id из localStorage
    comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=False)
    reaction = Column(String, nullable=False)  # 'like' or 'dislike'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (UniqueConstraint('user_id', 'comment_id', name='uix_user_comment'),)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)  # ID пользователя, которому отправляется уведомление
    type = Column(String, nullable=False)  # 'comment_reply', 'article_like', 'comment_like', etc.
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Integer, default=0)  # 0 = не прочитано, 1 = прочитано
    related_article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), nullable=True)
    related_comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ArticleLikeThreshold(Base):
    __tablename__ = "article_like_thresholds"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, nullable=False)  # ID автора статьи
    threshold = Column(Integer, nullable=False)  # Пороговое значение лайков
    reached_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (UniqueConstraint('article_id', 'threshold', name='uix_article_threshold'),)

# Модель настроек уведомлений удалена - используем фиксированные пороги
