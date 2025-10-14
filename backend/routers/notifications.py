from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.get("/notifications/", response_model=list[schemas.Notification])
def get_user_notifications(
    user_id: int, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Получить уведомления пользователя"""
    return crud.get_user_notifications(db, user_id=user_id, skip=skip, limit=limit)

@router.post("/notifications/{notification_id}/read", response_model=schemas.Notification)
def mark_notification_as_read(
    notification_id: int, 
    user_id: int, 
    db: Session = Depends(get_db)
):
    """Отметить уведомление как прочитанное"""
    notification = crud.mark_notification_as_read(db, notification_id, user_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification

@router.get("/notifications/unread-count")
def get_unread_notifications_count(user_id: int, db: Session = Depends(get_db)):
    """Получить количество непрочитанных уведомлений"""
    count = crud.get_unread_notifications_count(db, user_id)
    return {"unread_count": count}

@router.post("/notifications/", response_model=schemas.Notification)
def create_notification(notification: schemas.NotificationCreate, db: Session = Depends(get_db)):
    """Создать новое уведомление"""
    return crud.create_notification(db, notification)

# Настройки уведомлений удалены - используем фиксированные пороги
