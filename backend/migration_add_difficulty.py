#!/usr/bin/env python3
"""
Миграция для добавления поля difficulty в таблицу articles
"""
import sqlite3
import os

def migrate_database():
    db_path = os.path.join(os.path.dirname(__file__), '..', 'articles.db')
    
    if not os.path.exists(db_path):
        print(f"База данных {db_path} не найдена!")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Проверяем, существует ли уже поле difficulty
        cursor.execute("PRAGMA table_info(articles)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'difficulty' in columns:
            print("Поле difficulty уже существует в таблице articles")
            return
        
        # Добавляем поле difficulty
        cursor.execute("ALTER TABLE articles ADD COLUMN difficulty VARCHAR DEFAULT 'medium'")
        
        # Обновляем существующие записи
        cursor.execute("UPDATE articles SET difficulty = 'medium' WHERE difficulty IS NULL")
        
        conn.commit()
        print("Миграция успешно выполнена! Поле difficulty добавлено в таблицу articles")
        
    except Exception as e:
        print(f"Ошибка при выполнении миграции: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_database()
