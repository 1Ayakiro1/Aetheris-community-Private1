// Типы для работы со статьями

export interface Author {
  id: number
  username: string
  avatar?: string
  email?: string
  firstName?: string
  lastName?: string
  bio?: string
  createdAt: string | Date
  updatedAt?: string | Date
}

export interface Article {
  id: number
  title: string
  content: string
  excerpt?: string
  author: Author
  tags: string[]
  createdAt: string | Date
  updatedAt?: string | Date
  publishedAt?: string | Date
  status: 'draft' | 'published' | 'archived'
  views?: number
  likes?: number
  dislikes?: number
  comments?: number
  commentsCount?: number
  featured?: boolean
  category?: string
  readingTime?: number // в минутах
}

export interface ArticleCardProps {
  article: Article
}

export interface ArticleCardEmits {
  tagClick: [tag: string]
  authorClick: [authorId: number]
  articleClick: [articleId: number]
}

// Типы для API ответов
export interface ArticlesResponse {
  articles: Article[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ArticleResponse {
  article: Article
}

// Типы для создания/обновления статьи
export interface CreateArticleRequest {
  title: string
  content: string
  excerpt?: string
  tags: string[]
  status: 'draft' | 'published'
  category?: string
}

export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  id: number
}

// Типы для фильтрации статей
export interface ArticleFilters {
  authorId?: number
  tags?: string[]
  status?: 'draft' | 'published' | 'archived'
  category?: string
  search?: string
  dateFrom?: string | Date
  dateTo?: string | Date
  featured?: boolean
}

// Типы для пагинации
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'title'
  sortOrder?: 'asc' | 'desc'
}
