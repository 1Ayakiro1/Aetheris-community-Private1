# Деплой на Render

## Подготовка к деплою

### 1. Настройка переменных окружения

Создайте файл `.env` на основе `env.example`:

```bash
cp env.example .env
```

### 2. Локальная разработка

```bash
# Запуск бэкенда
cd backend
python run.py

# Запуск фронтенда (в другом терминале)
cd frontend
npm install
npm run dev
```

## Деплой на Render

### Вариант 1: Автоматический деплой через render.yaml

1. Загрузите код в GitHub репозиторий
2. В Render Dashboard:
   - Нажмите "New" → "Blueprint"
   - Подключите ваш GitHub репозиторий
   - Render автоматически создаст все сервисы и базу данных

### Вариант 2: Ручной деплой

#### 1. Создание базы данных PostgreSQL

1. В Render Dashboard создайте новую PostgreSQL базу данных
2. Скопируйте Connection String

#### 2. Создание Web Service

1. Создайте новый Web Service
2. Подключите GitHub репозиторий
3. Настройки:
   - **Build Command**: 
     ```bash
     pip install -r backend/requirements.txt && cd frontend && npm install && npm run build && cd .. && mkdir -p backend/static && cp -r frontend/dist/* backend/static/
     ```
   - **Start Command**: `cd backend && python run.py`
   - **Environment**: Python 3

#### 3. Переменные окружения

Добавьте следующие переменные в Render:

- `DATABASE_URL` - Connection String от PostgreSQL базы данных
- `FRONTEND_URL` - URL вашего фронтенда (например: https://your-app.onrender.com)
- `VITE_API_BASE_URL` - URL вашего API (например: https://your-app.onrender.com)

## Структура проекта после деплоя

- **Backend**: FastAPI сервер на Python
- **Frontend**: Статические файлы Vue.js, обслуживаемые FastAPI
- **Database**: PostgreSQL (вместо SQLite)
- **URL**: Единый домен для фронтенда и API

## Проверка деплоя

После успешного деплоя:

1. Откройте URL вашего приложения
2. Проверьте, что фронтенд загружается
3. Проверьте API endpoints (например: `/api/articles`)
4. Проверьте авторизацию и создание статей

## Возможные проблемы

1. **CORS ошибки**: Убедитесь, что `FRONTEND_URL` правильно настроен
2. **База данных**: Убедитесь, что `DATABASE_URL` корректный
3. **Статические файлы**: Проверьте, что фронтенд собран и скопирован в `backend/static/`
