"""
ДОКУМЕНТАЦИЯ СИСТЕМЫ СТАТЕЙ И КОНТЕНТА
=====================================

Автор: Ayakiro
Версия: 1.0
Дата создания: 18.09.2025

Этот документ описывает систему управления статьями, контентом и 
связанной функциональностью в проекте Aetheris Community.

ОБЗОР СИСТЕМЫ СТАТЕЙ
====================

Система включает в себя:
1. Просмотр и отображение статей
2. Создание и редактирование статей
3. Управление черновиками
4. Система тегов и категорий
5. Поиск и фильтрация контента
6. Аналитика просмотров
7. Система лайков и комментариев

КОМПОНЕНТЫ СИСТЕМЫ
==================

1. СТРАНИЦЫ (Views)
   - Articles.vue - основной список статей
   - ArticlesInteractive.vue - интерактивные статьи
   - ArticlesCompanies.vue - статьи компаний
   - CreateArticle.vue - создание/редактирование статей
   - YourArticles.vue - статьи пользователя
   - StaredArticles.vue - избранные статьи
   - DraftArticles.vue - черновики

2. КОМПОНЕНТЫ (Components)
   - ArticleCard.vue - карточка статьи
   - ArticleCardExample.vue - пример карточки

3. COMPOSABLES
   - useArticles.ts - управление статьями и данными

4. ТИПЫ (Types)
   - article.ts - TypeScript типы для статей

ДЕТАЛЬНОЕ ОПИСАНИЕ КОМПОНЕНТОВ
==============================

1. ТИПЫ ДАННЫХ (article.ts)
===========================

Расположение: /frontend/src/types/article.ts

ОСНОВНЫЕ ИНТЕРФЕЙСЫ:

Author - информация об авторе:
```typescript
interface Author {
  id: number                    // Уникальный ID автора
  username: string              // Имя пользователя
  avatar?: string              // URL аватара (опционально)
  email?: string               // Email (опционально)
  firstName?: string           // Имя (опционально)
  lastName?: string            // Фамилия (опционально)
  bio?: string                 // Биография (опционально)
  createdAt: string | Date     // Дата регистрации
  updatedAt?: string | Date    // Дата обновления профиля
}
```

Article - основная структура статьи:
```typescript
interface Article {
  id: number                   // Уникальный ID статьи
  title: string                // Заголовок статьи
  content: string              // Полный текст статьи
  excerpt?: string             // Краткое описание
  author: Author               // Информация об авторе
  tags: string[]               // Массив тегов
  createdAt: string | Date     // Дата создания
  updatedAt?: string | Date    // Дата последнего обновления
  publishedAt?: string | Date  // Дата публикации
  status: 'draft' | 'published' | 'archived'  // Статус статьи
  views?: number               // Количество просмотров
  likes?: number               // Количество лайков
  dislikes?: number            // Количество дизлайков
  comments?: number            // Количество комментариев
  commentsCount?: number       // Альтернативное поле для комментариев
  featured?: boolean           // Рекомендуемая статья
  category?: string            // Категория статьи
  readingTime?: number         // Время чтения в минутах
}
```

ТИПЫ ДЛЯ API:

ArticlesResponse - ответ API со списком статей:
```typescript
interface ArticlesResponse {
  articles: Article[]          // Массив статей
  total: number               // Общее количество
  page: number                // Текущая страница
  limit: number               // Лимит на страницу
  hasMore: boolean            // Есть ли еще статьи
}
```

CreateArticleRequest - данные для создания статьи:
```typescript
interface CreateArticleRequest {
  title: string               // Заголовок
  content: string             // Содержание
  excerpt?: string            // Краткое описание
  tags: string[]              // Теги
  status: 'draft' | 'published'  // Статус
  category?: string           // Категория
}
```

ArticleFilters - фильтры для поиска:
```typescript
interface ArticleFilters {
  authorId?: number           // Фильтр по автору
  tags?: string[]             // Фильтр по тегам
  status?: 'draft' | 'published' | 'archived'  // Фильтр по статусу
  category?: string           // Фильтр по категории
  search?: string             // Поисковый запрос
  dateFrom?: string | Date    // Дата от
  dateTo?: string | Date      // Дата до
  featured?: boolean          // Только рекомендуемые
}
```

2. УПРАВЛЕНИЕ СТАТЬЯМИ (useArticles.ts)
======================================

Расположение: /frontend/src/composables/useArticles.ts

РЕАКТИВНОЕ СОСТОЯНИЕ:
```typescript
const articles = ref<Article[]>([])        // Массив статей
const loading = ref(true)                  // Состояние загрузки
const error = ref<string | null>(null)     // Ошибки
const total = ref(0)                       // Общее количество
const currentPage = ref(1)                 // Текущая страница
const hasMore = ref(false)                 // Есть ли еще статьи
const initialized = ref(false)             // Флаг инициализации
const filters = ref<ArticleFilters>({})    // Текущие фильтры
const pagination = ref<PaginationParams>({ // Параметры пагинации
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc'
})
```

ОСНОВНЫЕ МЕТОДЫ:

fetchArticles() - загрузка статей:
```typescript
const fetchArticles = async (
  newFilters?: Partial<ArticleFilters>,
  newPagination?: Partial<PaginationParams>
) => {
  loading.value = true
  error.value = null

  try {
    // Обновляем фильтры и пагинацию
    if (newFilters) {
      filters.value = { ...filters.value, ...newFilters }
    }
    if (newPagination) {
      pagination.value = { ...pagination.value, ...newPagination }
    }

    // API вызов (пока моковые данные)
    const mockResponse: ArticlesResponse = {
      articles: generateMockArticles(pagination.value.limit, pagination.value.page),
      total: 100,
      page: pagination.value.page,
      limit: pagination.value.limit,
      hasMore: pagination.value.page < 10
    }

    // Обновляем состояние
    articles.value = mockResponse.articles
    total.value = mockResponse.total
    currentPage.value = mockResponse.page
    hasMore.value = mockResponse.hasMore
    initialized.value = true

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке статей'
  } finally {
    loading.value = false
  }
}
```

loadMore() - бесконечная прокрутка:
```typescript
const loadMore = async () => {
  if (hasMore.value && !loading.value) {
    const nextPage = currentPage.value + 1
    // Загружаем следующую страницу и добавляем к существующим
    articles.value.push(...mockResponse.articles)
  }
}
```

searchArticles() - поиск статей:
```typescript
const searchArticles = async (query: string) => {
  await updateFilters({ search: query })
}
```

filterByTag() - фильтрация по тегам:
```typescript
const filterByTag = async (tag: string) => {
  const currentTags = filters.value.tags || []
  const newTags = currentTags.includes(tag) 
    ? currentTags.filter(t => t !== tag)
    : [...currentTags, tag]
  
  await updateFilters({ tags: newTags })
}
```

ГЕНЕРАЦИЯ МОКОВЫХ ДАННЫХ:
Система включает детальную генерацию тестовых статей с:
- Реалистичными заголовками и контентом
- Различными авторами с аватарами
- Разнообразными тегами
- Случайными метриками (просмотры, лайки)
- Датами создания и обновления

3. КАРТОЧКА СТАТЬИ (ArticleCard.vue)
===================================

Расположение: /frontend/src/components/ArticleCard.vue

ФУНКЦИОНАЛ:
- Отображение информации о статье
- Аватар автора с fallback на инициалы
- Система тегов с кликабельностью
- Метрики статьи (просмотры, лайки, комментарии)
- Время чтения
- Адаптивный дизайн

PROPS:
```typescript
interface ArticleCardProps {
  article: Article
}
```

EVENTS:
```typescript
interface ArticleCardEmits {
  tagClick: [tag: string]      // Клик по тегу
  authorClick: [authorId: number]  // Клик по автору
  articleClick: [articleId: number]  // Клик по статье
}
```

4. СТРАНИЦЫ СТАТЕЙ
==================

Articles.vue - ОСНОВНОЙ СПИСОК СТАТЕЙ
====================================

Расположение: /frontend/src/views/Articles.vue
Маршрут: /articles

ФУНКЦИОНАЛ:
- Отображение списка всех статей
- Фильтрация и поиск
- Пагинация или бесконечная прокрутка
- Сортировка статей

ИСПОЛЬЗОВАНИЕ useArticles:
```typescript
import { useArticles } from '../composables/useArticles'

const {
  articles,
  loading,
  error,
  fetchArticles,
  searchArticles,
  filterByTag
} = useArticles()

// Инициализация
onMounted(() => {
  fetchArticles()
})
```

ArticlesInteractive.vue - ИНТЕРАКТИВНЫЕ СТАТЬИ
=============================================

Расположение: /frontend/src/views/ArticlesInteractive.vue
Маршрут: /articles/interactive

ФУНКЦИОНАЛ:
- Специализированные интерактивные статьи
- Фильтрация по типу интерактивности
- Особое отображение интерактивного контента

ArticlesCompanies.vue - СТАТЬИ КОМПАНИЙ
======================================

Расположение: /frontend/src/views/ArticlesCompanies.vue
Маршрут: /articles/companies

ФУНКЦИОНАЛ:
- Статьи от корпоративных авторов
- Фильтрация по компаниям
- Особая разметка для корпоративного контента

CreateArticle.vue - СОЗДАНИЕ И РЕДАКТИРОВАНИЕ
============================================

Расположение: /frontend/src/views/CreateArticle.vue
Маршрут: /create-article

ФУНКЦИОНАЛ:
- Rich text editor (Quill.js)
- Управление тегами
- Выбор категории
- Сохранение как черновик
- Публикация статьи
- Предпросмотр

СТРУКТУРА КОМПОНЕНТА:
```vue
<template>
  <div class="create-article">
    <h1>Создать статью</h1>
    
    <!-- Поле заголовка -->
    <input v-model="title" placeholder="Заголовок статьи" />
    
    <!-- Rich text editor -->
    <Editor v-model="content" />
    
    <!-- Управление тегами -->
    <div class="tags-input">
      <!-- Логика добавления/удаления тегов -->
    </div>
    
    <!-- Кнопки действий -->
    <div class="actions">
      <button @click="saveDraft">Сохранить черновик</button>
      <button @click="publish">Опубликовать</button>
    </div>
  </div>
</template>
```

YourArticles.vue - СТАТЬИ ПОЛЬЗОВАТЕЛЯ
=====================================

Расположение: /frontend/src/views/YourArticles.vue
Маршрут: /your-articles

ФУНКЦИОНАЛ:
- Список статей текущего пользователя
- Фильтрация по статусу (черновики, опубликованные)
- Действия: редактировать, удалить, опубликовать

StaredArticles.vue - ИЗБРАННЫЕ СТАТЬИ
===================================

Расположение: /frontend/src/views/StaredArticles.vue
Маршрут: /stared-articles

ФУНКЦИОНАЛ:
- Статьи, отмеченные пользователем как избранные
- Возможность убрать из избранного
- Группировка по категориям или тегам

DraftArticles.vue - ЧЕРНОВИКИ
============================

Расположение: /frontend/src/views/DraftArticles.vue
Маршрут: /draft-articles

ФУНКЦИОНАЛ:
- Список неопубликованных черновиков
- Продолжение редактирования
- Публикация черновиков
- Удаление ненужных черновиков

BACKEND ИНТЕГРАЦИЯ
==================

ПЛАНИРУЕМАЯ API СТРУКТУРА:

1. ПОЛУЧЕНИЕ СТАТЕЙ
Endpoint: GET /api/articles
Query Parameters:
- page: number (номер страницы)
- limit: number (количество на страницу)
- search: string (поисковый запрос)
- tags: string[] (фильтр по тегам)
- category: string (фильтр по категории)
- authorId: number (фильтр по автору)
- sortBy: string (поле сортировки)
- sortOrder: 'asc'|'desc' (направление сортировки)

Response:
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": 1,
        "title": "Заголовок статьи",
        "content": "Полный текст...",
        "excerpt": "Краткое описание...",
        "author": {
          "id": 1,
          "username": "author_name",
          "avatar": "https://example.com/avatar.jpg"
        },
        "tags": ["vue", "javascript", "frontend"],
        "createdAt": "2025-09-18T10:00:00Z",
        "publishedAt": "2025-09-18T10:00:00Z",
        "status": "published",
        "views": 150,
        "likes": 25,
        "commentsCount": 5,
        "readingTime": 8,
        "category": "Tutorial"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "hasMore": true
    }
  }
}
```

2. ПОЛУЧЕНИЕ СТАТЬИ ПО ID
Endpoint: GET /api/articles/:id

Response:
```json
{
  "success": true,
  "data": {
    "article": {
      // Полная информация о статье
    }
  }
}
```

3. СОЗДАНИЕ СТАТЬИ
Endpoint: POST /api/articles
Headers: Authorization: Bearer <token>

Request Body:
```json
{
  "title": "Заголовок статьи",
  "content": "Полный текст статьи...",
  "excerpt": "Краткое описание",
  "tags": ["vue", "javascript"],
  "category": "Tutorial",
  "status": "published"
}
```

Response:
```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "article": {
      // Созданная статья с ID
    }
  }
}
```

4. ОБНОВЛЕНИЕ СТАТЬИ
Endpoint: PUT /api/articles/:id
Headers: Authorization: Bearer <token>

Request Body: (частичное обновление)
```json
{
  "title": "Новый заголовок",
  "content": "Обновленный контент...",
  "status": "published"
}
```

5. УДАЛЕНИЕ СТАТЬИ
Endpoint: DELETE /api/articles/:id
Headers: Authorization: Bearer <token>

Response:
```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

6. ЛАЙКИ И ДЕЙСТВИЯ
Endpoint: POST /api/articles/:id/like
Headers: Authorization: Bearer <token>

Endpoint: POST /api/articles/:id/unlike
Headers: Authorization: Bearer <token>

Endpoint: POST /api/articles/:id/bookmark
Headers: Authorization: Bearer <token>

7. КОММЕНТАРИИ
Endpoint: GET /api/articles/:id/comments
Endpoint: POST /api/articles/:id/comments
Endpoint: PUT /api/comments/:id
Endpoint: DELETE /api/comments/:id

ИНТЕГРАЦИЯ С FRONTEND
====================

ОБНОВЛЕНИЯ useArticles.ts ДЛЯ API:

```typescript
import { api } from '../services/api'  // HTTP клиент

export function useArticles() {
  // Замена моковых данных на реальные API вызовы
  
  const fetchArticles = async (newFilters?: Partial<ArticleFilters>, newPagination?: Partial<PaginationParams>) => {
    loading.value = true
    error.value = null

    try {
      // Обновляем параметры
      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }
      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }

      // Реальный API вызов
      const response = await api.get('/articles', {
        params: {
          page: pagination.value.page,
          limit: pagination.value.limit,
          sortBy: pagination.value.sortBy,
          sortOrder: pagination.value.sortOrder,
          ...filters.value
        }
      })

      // Обновляем состояние
      articles.value = response.data.articles
      total.value = response.data.pagination.total
      currentPage.value = response.data.pagination.page
      hasMore.value = response.data.pagination.hasMore
      initialized.value = true

    } catch (err) {
      error.value = err.response?.data?.message || 'Ошибка загрузки статей'
    } finally {
      loading.value = false
    }
  }

  const createArticle = async (articleData: CreateArticleRequest): Promise<Article> => {
    const response = await api.post('/articles', articleData)
    return response.data.article
  }

  const updateArticle = async (id: number, updates: Partial<CreateArticleRequest>): Promise<Article> => {
    const response = await api.put(`/articles/${id}`, updates)
    return response.data.article
  }

  const deleteArticle = async (id: number): Promise<void> => {
    await api.delete(`/articles/${id}`)
  }

  const likeArticle = async (id: number): Promise<void> => {
    await api.post(`/articles/${id}/like`)
  }

  const bookmarkArticle = async (id: number): Promise<void> => {
    await api.post(`/articles/${id}/bookmark`)
  }

  return {
    // ... существующие методы
    createArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
    bookmarkArticle
  }
}
```

ПОИСК И ФИЛЬТРАЦИЯ
==================

КЛИЕНТСКАЯ ФИЛЬТРАЦИЯ:
Composable включает клиентскую фильтрацию для быстрого отклика:

```typescript
const filteredArticles = computed(() => {
  let result = articles.value

  // Поиск по тексту
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    result = result.filter(article => 
      article.title.toLowerCase().includes(searchLower) ||
      article.content.toLowerCase().includes(searchLower) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // Фильтр по тегам
  if (filters.value.tags && filters.value.tags.length > 0) {
    result = result.filter(article =>
      filters.value.tags!.some(tag => article.tags.includes(tag))
    )
  }

  // Фильтр по автору
  if (filters.value.authorId) {
    result = result.filter(article => article.author.id === filters.value.authorId)
  }

  // Фильтр по статусу
  if (filters.value.status) {
    result = result.filter(article => article.status === filters.value.status)
  }

  return result
})
```

СЕРВЕРНАЯ ФИЛЬТРАЦИЯ:
Основная фильтрация происходит на сервере через query параметры.

СИСТЕМА ТЕГОВ
=============

УПРАВЛЕНИЕ ТЕГАМИ:
- Автодополнение существующих тегов
- Ограничение количества тегов на статью
- Валидация формата тегов
- Популярные теги для быстрого выбора

ОТОБРАЖЕНИЕ ТЕГОВ:
- Кликабельные теги в карточках
- Цветовое кодирование по категориям
- Счетчики использования тегов

АНАЛИТИКА И МЕТРИКИ
==================

ОТСЛЕЖИВАЕМЫЕ МЕТРИКИ:
- Просмотры статей
- Лайки и дизлайки
- Количество комментариев
- Время чтения
- Shares (планируется)
- Bounce rate (планируется)

АНАЛИТИЧЕСКАЯ ПАНЕЛЬ:
Страница Analytics.vue будет включать:
- Графики популярности статей
- Статистика по авторам
- Трендовые теги
- Engagement метрики

ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
==============================

FRONTEND ОПТИМИЗАЦИИ:
1. Lazy loading изображений
2. Виртуализация длинных списков
3. Кеширование загруженных статей
4. Debounce для поиска
5. Infinite scroll вместо пагинации
6. Предзагрузка критических статей

BACKEND ОПТИМИЗАЦИИ (планируется):
1. Индексирование полей поиска
2. Кеширование популярных статей
3. CDN для статических ресурсов
4. Pagination с cursor-based navigation
5. Full-text search (Elasticsearch)

SEO И ДОСТУПНОСТЬ
=================

SEO ОПТИМИЗАЦИЯ:
1. Meta теги для каждой статьи
2. Open Graph теги
3. Структурированные данные (JSON-LD)
4. SEO-friendly URLs
5. Sitemap генерация

ДОСТУПНОСТЬ:
1. ARIA атрибуты
2. Семантическая разметка
3. Keyboard navigation
4. Screen reader поддержка
5. Контрастность цветов

ТЕСТИРОВАНИЕ
============

UNIT ТЕСТЫ:
- Тестирование useArticles composable
- Тестирование ArticleCard компонента
- Тестирование фильтрации и поиска

ИНТЕГРАЦИОННЫЕ ТЕСТЫ:
- Тестирование API интеграции
- Тестирование полного flow создания статьи
- Тестирование поиска и фильтрации

E2E ТЕСТЫ:
- Создание статьи end-to-end
- Поиск и фильтрация
- Взаимодействие с карточками статей

ПЛАНЫ РАЗВИТИЯ
==============

БЛИЖАЙШИЕ ЗАДАЧИ:
1. Реализация backend API
2. Интеграция с реальными данными
3. Система комментариев
4. Rich text editor улучшения

СРЕДНЕСРОЧНЫЕ ПЛАНЫ:
1. Система уведомлений
2. Collaborative editing
3. Версионирование статей
4. Advanced search

ДОЛГОСРОЧНЫЕ ПЛАНЫ:
1. AI-powered рекомендации
2. Автоматическая категоризация
3. Multi-language support
4. Integration с внешними платформами

=====================================
Конец документации системы статей
=====================================
"""