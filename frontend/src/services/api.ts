/**
 * API SERVICE
 * Центральный сервис для работы с backend API
 *
 * Автор: pinicilin
 * Версия: 1.0
 * Дата создания: 18.09.2025
 */

import { ref } from 'vue'

// Базовая конфигурация API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const API_TIMEOUT = 30000 // 30 секунд

// Глобальное состояние loading для API запросов
export const globalLoading = ref(false)

// Типы для API ответов
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string>
}

export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string>
}

/**
 * Базовый HTTP клиент
 */
class ApiClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL
    this.timeout = timeout
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  /**
   * Получение токена авторизации из localStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  /**
   * Получение заголовков для запроса
   */
  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...customHeaders }

    const token = this.getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  /**
   * Универсальный метод для HTTP запросов
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const headers = this.getHeaders(customHeaders)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      globalLoading.value = true

      const config: RequestInit = {
        method,
        headers,
        signal: controller.signal
      }

      if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
        config.body = JSON.stringify(data)
      }

      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorData: any = {}
        try {
          errorData = await response.json()
        } catch {
          // Если не удалось распарсить JSON, используем текст
          errorData = { message: await response.text() }
        }

        throw {
          status: response.status,
          message: errorData.message || `HTTP Error ${response.status}`,
          errors: errorData.errors
        } as ApiError
      }

      const result = await response.json()
      return result as ApiResponse<T>

    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          status: 408,
          message: 'Request timeout'
        } as ApiError
      }

      // Если это уже ApiError, прокидываем дальше
      if (error && typeof error === 'object' && 'status' in error) {
        throw error
      }

      // Обрабатываем сетевые ошибки
      throw {
        status: 0,
        message: 'Network error. Please check your connection.'
      } as ApiError

    } finally {
      globalLoading.value = false
    }
  }

  /**
   * GET запрос
   */
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, headers)
  }

  /**
   * POST запрос
   */
  async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, headers)
  }

  /**
   * PUT запрос
   */
  async put<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, headers)
  }

  /**
   * PATCH запрос
   */
  async patch<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, headers)
  }

  /**
   * DELETE запрос
   */
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, headers)
  }

  /**
   * Загрузка файлов
   */
  async upload<T>(endpoint: string, formData: FormData, progressCallback?: (progress: number) => void): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const headers = this.getHeaders()

    // Удаляем Content-Type для FormData (браузер сам установит с boundary)
    delete headers['Content-Type']

    try {
      globalLoading.value = true

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && progressCallback) {
            const progress = Math.round((event.loaded / event.total) * 100)
            progressCallback(progress)
          }
        })

        xhr.addEventListener('load', () => {
          try {
            const result = JSON.parse(xhr.responseText)
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(result as ApiResponse<T>)
            } else {
              reject({
                status: xhr.status,
                message: result.message || `HTTP Error ${xhr.status}`,
                errors: result.errors
              } as ApiError)
            }
          } catch {
            reject({
              status: xhr.status,
              message: 'Invalid response format'
            } as ApiError)
          }
        })

        xhr.addEventListener('error', () => {
          reject({
            status: 0,
            message: 'Network error during upload'
          } as ApiError)
        })

        xhr.addEventListener('timeout', () => {
          reject({
            status: 408,
            message: 'Upload timeout'
          } as ApiError)
        })

        xhr.open('POST', url)
        xhr.timeout = this.timeout

        // Устанавливаем заголовки (кроме Content-Type)
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value)
        })

        xhr.send(formData)
      })

    } finally {
      globalLoading.value = false
    }
  }
}

// Создаем экземпляр API клиента
export const api = new ApiClient()

/**
 * Специализированные API сервисы
 */

// Аутентификация
export const authApi = {
  login: (credentials: { login: string; password: string }) =>
    api.post('/auth/login', credentials),

  register: (userData: { nickname: string; email: string; password: string }) =>
    api.post('/auth/register', userData),

  logout: () =>
    api.post('/auth/logout'),

  me: () =>
    api.get('/auth/me'),

  refreshToken: () =>
    api.post('/auth/refresh'),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword })
}

// Статьи
export const articlesApi = {
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return api.get(`/articles${queryString}`)
  },

  getById: (id: number) =>
    api.get(`/articles/${id}`),

  create: (articleData: any) =>
    api.post('/articles', articleData),

  update: (id: number, articleData: any) =>
    api.put(`/articles/${id}`, articleData),

  delete: (id: number) =>
    api.delete(`/articles/${id}`),

  like: (id: number) =>
    api.post(`/articles/${id}/like`),

  unlike: (id: number) =>
    api.delete(`/articles/${id}/like`),

  bookmark: (id: number) =>
    api.post(`/articles/${id}/bookmark`),

  unbookmark: (id: number) =>
    api.delete(`/articles/${id}/bookmark`),

  getComments: (id: number) =>
    api.get(`/articles/${id}/comments`),

  addComment: (id: number, comment: string) =>
    api.post(`/articles/${id}/comments`, { comment }),

  getDrafts: () =>
    api.get('/articles/drafts'),

  getBookmarked: () =>
    api.get('/articles/bookmarked')
}

// Пользователи
export const usersApi = {
  getProfile: (id?: number) =>
    api.get(id ? `/users/${id}` : '/users/me'),

  updateProfile: (profileData: any) =>
    api.put('/users/me', profileData),

  uploadAvatar: (formData: FormData, progressCallback?: (progress: number) => void) =>
    api.upload('/users/me/avatar', formData, progressCallback),

  getUserArticles: (id: number, params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return api.get(`/users/${id}/articles${queryString}`)
  },

  followUser: (id: number) =>
    api.post(`/users/${id}/follow`),

  unfollowUser: (id: number) =>
    api.delete(`/users/${id}/follow`),

  getFollowers: (id: number) =>
    api.get(`/users/${id}/followers`),

  getFollowing: (id: number) =>
    api.get(`/users/${id}/following`)
}

// Комментарии
export const commentsApi = {
  update: (id: number, comment: string) =>
    api.put(`/comments/${id}`, { comment }),

  delete: (id: number) =>
    api.delete(`/comments/${id}`),

  like: (id: number) =>
    api.post(`/comments/${id}/like`),

  unlike: (id: number) =>
    api.delete(`/comments/${id}/like`),

  reply: (id: number, reply: string) =>
    api.post(`/comments/${id}/replies`, { reply })
}

// Теги
export const tagsApi = {
  getPopular: () =>
    api.get('/tags/popular'),

  search: (query: string) =>
    api.get(`/tags/search?q=${encodeURIComponent(query)}`),

  getAll: () =>
    api.get('/tags')
}

// Уведомления
export const notificationsApi = {
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : ''
    return api.get(`/notifications${queryString}`)
  },

  markAsRead: (id: number) =>
    api.patch(`/notifications/${id}`, { read: true }),

  markAllAsRead: () =>
    api.patch('/notifications/mark-all-read'),

  delete: (id: number) =>
    api.delete(`/notifications/${id}`),

  getUnreadCount: () =>
    api.get('/notifications/unread-count')
}

// Поиск
export const searchApi = {
  articles: (query: string, params?: Record<string, any>) => {
    const searchParams = { q: query, ...params }
    const queryString = '?' + new URLSearchParams(searchParams).toString()
    return api.get(`/search/articles${queryString}`)
  },

  users: (query: string, params?: Record<string, any>) => {
    const searchParams = { q: query, ...params }
    const queryString = '?' + new URLSearchParams(searchParams).toString()
    return api.get(`/search/users${queryString}`)
  },

  global: (query: string, params?: Record<string, any>) => {
    const searchParams = { q: query, ...params }
    const queryString = '?' + new URLSearchParams(searchParams).toString()
    return api.get(`/search${queryString}`)
  }
}

// Аналитика
export const analyticsApi = {
  getArticleStats: (id: number) =>
    api.get(`/analytics/articles/${id}`),

  getUserStats: () =>
    api.get('/analytics/users/me'),

  getDashboard: () =>
    api.get('/analytics/dashboard'),

  getPopularArticles: (timeframe: string = '7d') =>
    api.get(`/analytics/popular-articles?timeframe=${timeframe}`),

  getTrendingTags: () =>
    api.get('/analytics/trending-tags')
}

// Настройки
export const settingsApi = {
  get: () =>
    api.get('/settings'),

  update: (settings: any) =>
    api.put('/settings', settings),

  updateTheme: (theme: string) =>
    api.patch('/settings/theme', { theme }),

  updateLanguage: (language: string) =>
    api.patch('/settings/language', { language }),

  updateNotifications: (notifications: any) =>
    api.patch('/settings/notifications', notifications)
}

/**
 * Утилиты для обработки ошибок
 */
export const errorUtils = {
  isNetworkError: (error: ApiError): boolean => error.status === 0,
  isTimeoutError: (error: ApiError): boolean => error.status === 408,
  isAuthError: (error: ApiError): boolean => error.status === 401,
  isForbiddenError: (error: ApiError): boolean => error.status === 403,
  isNotFoundError: (error: ApiError): boolean => error.status === 404,
  isValidationError: (error: ApiError): boolean => error.status === 422 || error.status === 400,
  isServerError: (error: ApiError): boolean => error.status >= 500,

  getErrorMessage: (error: ApiError): string => {
    if (errorUtils.isNetworkError(error)) {
      return 'Проблемы с подключением к интернету'
    }
    if (errorUtils.isTimeoutError(error)) {
      return 'Превышено время ожидания ответа сервера'
    }
    if (errorUtils.isAuthError(error)) {
      return 'Требуется авторизация'
    }
    if (errorUtils.isForbiddenError(error)) {
      return 'Недостаточно прав доступа'
    }
    if (errorUtils.isNotFoundError(error)) {
      return 'Ресурс не найден'
    }
    if (errorUtils.isServerError(error)) {
      return 'Внутренняя ошибка сервера'
    }
    return error.message || 'Произошла неизвестная ошибка'
  }
}

/**
 * Перехватчик для автоматического обновления токена
 */
export const setupTokenInterceptor = () => {
  // Здесь можно добавить логику автоматического обновления токена
  // при получении ошибки 401
}

export default api
