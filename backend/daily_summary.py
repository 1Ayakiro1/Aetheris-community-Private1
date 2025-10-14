"""
Система ежедневных сводок для уведомлений о лайках
Запускается как фоновая задача для экономии ресурсов сервера
"""
import json
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend import crud, models, schemas

def send_daily_summaries():
    """Отправить ежедневные сводки о лайках статей (упрощенная версия)"""
    db = SessionLocal()
    try:
        # Получаем всех пользователей
        users = db.query(models.User).all()
        
        for user in users:
            # Получаем статьи пользователя, которые получили лайки за последние 24 часа
            yesterday = datetime.now() - timedelta(days=1)
                
            # Получаем статьи автора с лайками за последние 24 часа
            articles_with_likes = db.query(models.Article).filter(
                models.Article.author == user.username,
                models.Article.likes > 0,
                models.Article.created_at >= yesterday
            ).all()
            
            if not articles_with_likes:
                continue
                
            # Подсчитываем общее количество лайков
            total_likes = sum(article.likes for article in articles_with_likes)
            
            if total_likes >= 10:  # Отправляем сводку только если >= 10 лайков
                # Создаем уведомление-сводку
                if len(articles_with_likes) == 1:
                    message = f"Ваша статья \"{articles_with_likes[0].title}\" получила {total_likes} лайков за последние 24 часа!"
                else:
                    article_titles = [f"\"{article.title}\"" for article in articles_with_likes[:3]]
                    if len(articles_with_likes) > 3:
                        article_titles.append(f"и еще {len(articles_with_likes) - 3} статей")
                    message = f"Ваши статьи {', '.join(article_titles)} получили {total_likes} лайков за последние 24 часа!"
                
                notification = schemas.NotificationCreate(
                    user_id=user.id,
                    type="daily_summary",
                    title="Ежедневная сводка лайков",
                    message=message,
                    related_article_id=articles_with_likes[0].id if articles_with_likes else None
                )
                crud.create_notification(db, notification)
                
    except Exception as e:
        print(f"Error in daily summary: {e}")
    finally:
        db.close()

def send_weekly_summaries():
    """Отправить еженедельные сводки (упрощенная версия)"""
    db = SessionLocal()
    try:
        # Аналогично ежедневным, но за 7 дней
        week_ago = datetime.now() - timedelta(days=7)
        
        # Получаем всех пользователей
        users = db.query(models.User).all()
        
        for user in users:
            articles_with_likes = db.query(models.Article).filter(
                models.Article.author == user.username,
                models.Article.likes > 0,
                models.Article.created_at >= week_ago
            ).all()
            
            if not articles_with_likes:
                continue
                
            total_likes = sum(article.likes for article in articles_with_likes)
            
            if total_likes >= 50:  # Более высокий порог для недельной сводки
                message = f"За последнюю неделю ваши статьи получили {total_likes} лайков!"
                
                notification = schemas.NotificationCreate(
                    user_id=user.id,
                    type="weekly_summary",
                    title="Еженедельная сводка лайков",
                    message=message
                )
                crud.create_notification(db, notification)
                
    except Exception as e:
        print(f"Error in weekly summary: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    # Для тестирования
    send_daily_summaries()
    print("Daily summaries sent!")
