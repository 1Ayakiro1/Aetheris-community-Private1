from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from .database import Base
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
