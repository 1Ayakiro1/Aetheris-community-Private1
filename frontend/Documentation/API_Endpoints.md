# API ЭНДПОИНТЫ ДЛЯ BACKEND

## АУТЕНТИФИКАЦИЯ

### POST /api/auth/register
**Регистрация нового пользователя**

**Request Body:**
```json
{
  "nickname": "string (3-24 chars)",
  "email": "string (valid email)",
  "password": "string (8-48 chars)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "number",
    "nickname": "string",
    "email": "string",
    "createdAt": "datetime"
  },
  "token": "jwt_token"
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "nickname": "Nickname already exists",
    "email": "Invalid email format"
  }
}
```

### POST /api/auth/login
**Авторизация пользователя**

**Request Body:**
```json
{
  "login": "string (nickname or email)",
  "password": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "number",
    "nickname": "string",
    "email": "string",
    "lastLoginAt": "datetime"
  },
  "token": "jwt_token"
}
```

**Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### GET /api/auth/me
**Проверка токена**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "number",
    "nickname": "string",
    "email": "string",
    "avatar": "string|null",
    "createdAt": "datetime",
    "lastLoginAt": "datetime"
  }
}
```

### POST /api/auth/logout
**Выход из системы**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## СТАТЬИ

### GET /api/articles
**Получение списка статей для главной страницы Articles.vue**

**Какая функция подгружает:** `loadArticles()` в composables/useArticles.ts
**Когда вызывается:** При загрузке страницы, смене фильтров, пагинации

**Query Parameters:**
- `page`: number (номер страницы, по умолчанию 1)
- `limit`: number (10 для стандартного отображения, 20-25 для списка)
- `search`: string (поиск по заголовку и контенту)
- `tags`: string[] (массив тегов через запятую: "vue,javascript,typescript")
- `category`: string (фильтр по категории: "frontend", "backend", "tutorial")
- `authorId`: number (ID автора для фильтрации)
- `sortBy`: string (поле: "createdAt", "views", "likes", "title")
- `sortOrder`: 'asc'|'desc' (направление сортировки)
- `featured`: boolean (только избранные статьи)

**Пример запроса:**
```
GET /api/articles?page=1&limit=10&search=vue&tags=frontend,tutorial&sortBy=createdAt&sortOrder=desc
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": 1,
        "title": "string",
        "content": "string",
        "excerpt": "string",
        "author": {
          "id": 1,
          "username": "string",
          "avatar": "string|null"
        },
        "tags": ["string"],
        "createdAt": "datetime",
        "publishedAt": "datetime",
        "status": "draft|published|archived",
        "views": "number",
        "likes": "number",
        "commentsCount": "number",
        "readingTime": "number",
        "category": "string"
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "limit": "number",
      "hasMore": "boolean"
    }
  }
}
```

### GET /api/articles/:id
**Получение полной статьи по ID для просмотра**

**Какая функция подгружает:** `loadArticle(id)` в composables/useArticles.ts
**Когда вызывается:** При клике на карточку статьи, переходе по прямой ссылке

**URL Parameters:**
- `id`: number (ID статьи)

**Что загружает:**
- Полный контент статьи
- Информацию об авторе
- Теги и категорию
- Статистику (просмотры, лайки, комментарии)
- Счетчик времени чтения

**Response (200):**
```json
{
  "success": true,
  "data": {
    "article": {
      "id": 1,
      "title": "Изучаем Vue 3",
      "content": "Полный HTML контент статьи...",
      "excerpt": "Краткое описание",
      "author": {
        "id": 1,
        "username": "johndoe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "tags": ["vue", "javascript", "frontend"],
      "category": "tutorial",
      "views": 1250,
      "likes": 45,
      "commentsCount": 12,
      "readingTime": 8,
      "createdAt": "2024-01-15T10:30:00Z",
      "publishedAt": "2024-01-15T12:00:00Z"
    }
  }
}
```

### POST /api/articles
**Создание новой статьи в редакторе**

**Какая функция подгружает:** `createArticle()` в composables/useArticles.ts
**Когда вызывается:** При сохранении статьи в CreateArticle.vue

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "string (максимум 255 символов)",
  "content": "string (HTML контент из Quill редактора)",
  "excerpt": "string (краткое описание, максимум 500 символов)",
  "tags": ["string"] (массив тегов, максимум 10 тегов),
  "category": "string (одна из: tutorial, guide, news, review)",
  "status": "draft|published" (черновик или опубликовано)
}
```

**Что загружается в функцию:**
- `title` - заголовок из input поля
- `content` - HTML контент из Quill Editor
- `excerpt` - автоматически из первых 500 символов или ручной ввод
- `tags` - массив выбранных тегов из Tag компонента
- `category` - выбранная категория из dropdown
- `status` - статус публикации (draft/published)

**Response (201):**
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

### PUT /api/articles/:id
**Обновление статьи**

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "tags": ["string"],
  "status": "draft|published"
}
```

### DELETE /api/articles/:id
**Удаление статьи**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

### POST /api/articles/:id/like
**Лайк статьи**

**Какая функция подгружает:** `toggleLike(articleId)` в ArticleCard.vue
**Когда вызывается:** При клике на кнопку лайка в карточке статьи

**Headers:** `Authorization: Bearer <token>`

**URL Parameters:**
- `id`: number (ID статьи)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "liked": true,
    "likesCount": 46
  }
}
```

### POST /api/articles/:id/unlike
**Убрать лайк**

**Какая функция подгружает:** `toggleLike(articleId)` в ArticleCard.vue
**Когда вызывается:** При повторном клике на кнопку лайка

**Headers:** `Authorization: Bearer <token>`

### POST /api/articles/:id/bookmark
**Добавить/убрать из закладок**

**Какая функция подгружает:** `toggleBookmark(articleId)` в ArticleCard.vue
**Когда вызывается:** При клике на кнопку закладки

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookmarked": true,
    "message": "Article added to bookmarks"
  }
}
```

## КОММЕНТАРИИ

### GET /api/articles/:id/comments
**Получение комментариев к статье**

**Какая функция подгружает:** `loadComments(articleId)` в composables/useComments.ts
**Когда вызывается:** При открытии секции комментариев в статье

**URL Parameters:**
- `id`: number (ID статьи)

**Query Parameters:**
- `page`: number (страница комментариев)
- `limit`: number (количество комментариев, по умолчанию 20)
- `sortBy`: 'newest'|'oldest'|'popular' (сортировка)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": 1,
        "content": "Отличная статья!",
        "author": {
          "id": 1,
          "username": "johndoe",
          "avatar": "https://example.com/avatar.jpg"
        },
        "createdAt": "2024-01-15T14:30:00Z",
        "likes": 5,
        "parentId": null
      }
    ],
    "pagination": {
      "total": 12,
      "page": 1,
      "hasMore": false
    }
  }
}
```

### POST /api/articles/:id/comments
**Создание комментария**

**Какая функция подгружает:** `createComment(articleId, content)` в composables/useComments.ts
**Когда вызывается:** При отправке формы комментария

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "string (максимум 1000 символов)",
  "parentId": "number|null (ID родительского комментария для ответов)"
}
```

**Что загружается:**
- `content` - текст комментария из textarea
- `parentId` - ID комментария на который отвечают (если это ответ)

### PUT /api/comments/:id
**Обновление комментария**

**Headers:** `Authorization: Bearer <token>`

### DELETE /api/comments/:id
**Удаление комментария**

**Headers:** `Authorization: Bearer <token>`

## ПОЛЬЗОВАТЕЛИ

### GET /api/users/:id
**Получение профиля пользователя**

### PUT /api/users/:id
**Обновление профиля**

**Headers:** `Authorization: Bearer <token>`

### GET /api/users/:id/articles
**Статьи пользователя**

## ВАЛИДАЦИЯ

### Никнейм
- Длина: 3-24 символа
- Разрешенные символы: буквы, цифры, _, -
- Не может начинаться с цифры

### Email
- Валидный формат email
- Максимальная длина: 254 символа

### Пароль
- Длина: 8-48 символов
- Обязательно: заглавная буква, строчная буква, цифра, специальный символ
