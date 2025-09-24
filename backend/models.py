from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base
import json

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    excerpt = Column(String, nullable=True)
    author = Column(String, nullable=False, default="Anonymous")
    tags = Column(String, nullable=True)  # JSON строка
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    status = Column(String, default="published")
    likes = Column(Integer, default=0)
    dislikes = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)

    def get_tags_list(self):
        if self.tags:
            return json.loads(self.tags)
        return []

    def set_tags_list(self, tags_list):
        self.tags = json.dumps(tags_list)
