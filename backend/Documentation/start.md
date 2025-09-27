# Запуск проекта

## Backend (FastAPI) start
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend start
```bash
npm run dev -- --host 0.0.0.0
```
- App: http://localhost:5173/
- Если порт 5173 занят, автоматически выберется 5174