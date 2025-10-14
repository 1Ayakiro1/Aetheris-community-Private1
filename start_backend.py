#!/usr/bin/env python3
import sys
import os

# Добавляем папку backend в Python path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

# Меняем рабочую директорию на backend
os.chdir(backend_path)

# Теперь импортируем и запускаем приложение
import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
