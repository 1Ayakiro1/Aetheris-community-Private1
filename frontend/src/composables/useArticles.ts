import { ref, computed } from 'vue'
import { articlesApi, errorUtils, type ApiError } from '../services/api'
import type { Article, ArticlesResponse, ArticleFilters, PaginationParams, CreateArticleRequest } from '../types/article'

// Состояние для статей
const articles = ref<Article[]>([])
const loading = ref(true) // Начинаем с загрузки
const error = ref<string | null>(null)
const total = ref(0)
const currentPage = ref(1)
const hasMore = ref(false)
const initialized = ref(false) // Флаг инициализации

// Фильтры
const filters = ref<ArticleFilters>({})
const pagination = ref<PaginationParams>({
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc'
})

export function useArticles() {
  // Получение статей с сервера
  const fetchArticles = async (newFilters?: Partial<ArticleFilters>, newPagination?: Partial<PaginationParams>) => {
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

      // Подготавливаем параметры для API
      const params = {
        page: pagination.value.page,
        limit: pagination.value.limit,
        sortBy: pagination.value.sortBy,
        sortOrder: pagination.value.sortOrder,
        ...filters.value
      }

      // Реальный API вызов
      const response = await articlesApi.getAll(params)
      
      if (response.success && response.data) {
        const articlesData = response.data as ArticlesResponse
        
        // Всегда заменяем статьи при загрузке новой страницы
        articles.value = articlesData.articles
        total.value = articlesData.total
        currentPage.value = articlesData.page
        hasMore.value = articlesData.hasMore
        initialized.value = true
      } else {
        throw new Error(response.message || 'Не удалось загрузить статьи')
      }

    } catch (err) {
      const apiError = err as ApiError
      error.value = errorUtils.getErrorMessage(apiError)
      console.error('Ошибка загрузки статей:', err)
      initialized.value = true
      
      // Если ошибка сети, показываем моковые данные для разработки
      if (errorUtils.isNetworkError(apiError) && import.meta.env.DEV) {
        console.error('Failed to load articles:', error)
        articles.value = []
        total.value = 0
        currentPage.value = 1
        hasMore.value = false
      }
    } finally {
      loading.value = false
    }
  }

  // Загрузка следующей страницы (для бесконечной прокрутки)
  const loadMore = async () => {
    if (hasMore.value && !loading.value) {
      const nextPage = currentPage.value + 1
      loading.value = true
      error.value = null

      try {
        // Здесь будет запрос к API для загрузки следующей страницы
        // const response = await api.get(`/articles?page=${nextPage}&limit=${pagination.value.limit}`)
        throw new Error('API not implemented')
      } catch (err) {
        console.error('Failed to load more articles:', err)
        hasMore.value = false
        error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке статей'
        console.error('Ошибка загрузки статей:', err)
      } finally {
        loading.value = false
      }
    }
  }

  // Обновление фильтров
  const updateFilters = async (newFilters: Partial<ArticleFilters>) => {
    await fetchArticles(newFilters, { page: 1 })
  }

  // Поиск статей
  const searchArticles = async (query: string) => {
    await updateFilters({ search: query })
  }

  // Фильтрация по тегам
  const filterByTag = async (tag: string) => {
    const currentTags = filters.value.tags || []
    const newTags = currentTags.includes(tag) 
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    
    await updateFilters({ tags: newTags })
  }

  // Фильтрация по автору
  const filterByAuthor = async (authorId: number) => {
    await updateFilters({ authorId })
  }

  // Сброс фильтров
  const resetFilters = async () => {
    filters.value = {}
    await fetchArticles({}, { page: 1 })
  }

  // Получение статьи по ID
  const getArticleById = async (id: number): Promise<Article | null> => {
    try {
      const response = await articlesApi.getById(id)
      
      if (response.success && response.data) {
        return response.data.article
      }
      
      return null
    } catch (err) {
      console.error('Ошибка загрузки статьи:', err)
      
      // В режиме разработки возвращаем моковую статью при ошибке сети
      if (errorUtils.isNetworkError(err as ApiError) && import.meta.env.DEV) {
        throw new Error('Article not found')
      }
      
      return null
    }
  }

  // Создание новой статьи
  const createArticle = async (articleData: CreateArticleRequest): Promise<Article | null> => {
    try {
      loading.value = true
      error.value = null

      const response = await articlesApi.create(articleData)
      
      if (response.success && response.data) {
        const newArticle = response.data.article
        
        // Добавляем новую статью в начало списка
        articles.value.unshift(newArticle)
        total.value += 1
        
        return newArticle
      }
      
      throw new Error(response.message || 'Не удалось создать статью')
    } catch (err) {
      const apiError = err as ApiError
      error.value = errorUtils.getErrorMessage(apiError)
      console.error('Ошибка создания статьи:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Обновление статьи
  const updateArticle = async (id: number, updates: Partial<CreateArticleRequest>): Promise<Article | null> => {
    try {
      loading.value = true
      error.value = null

      const response = await articlesApi.update(id, updates)
      
      if (response.success && response.data) {
        const updatedArticle = response.data.article
        
        // Обновляем статью в списке
        const index = articles.value.findIndex(article => article.id === id)
        if (index !== -1) {
          articles.value[index] = updatedArticle
        }
        
        return updatedArticle
      }
      
      throw new Error(response.message || 'Не удалось обновить статью')
    } catch (err) {
      const apiError = err as ApiError
      error.value = errorUtils.getErrorMessage(apiError)
      console.error('Ошибка обновления статьи:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Удаление статьи
  const deleteArticle = async (id: number): Promise<boolean> => {
    try {
      loading.value = true
      error.value = null

      const response = await articlesApi.delete(id)
      
      if (response.success) {
        // Удаляем статью из списка
        const index = articles.value.findIndex(article => article.id === id)
        if (index !== -1) {
          articles.value.splice(index, 1)
          total.value = Math.max(0, total.value - 1)
        }
        
        return true
      }
      
      throw new Error(response.message || 'Не удалось удалить статью')
    } catch (err) {
      const apiError = err as ApiError
      error.value = errorUtils.getErrorMessage(apiError)
      console.error('Ошибка удаления статьи:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Лайк статьи
  const likeArticle = async (id: number): Promise<boolean> => {
    try {
      const response = await articlesApi.like(id)
      
      if (response.success) {
        // Обновляем счетчик лайков в списке
        const article = articles.value.find(a => a.id === id)
        if (article) {
          article.likes = (article.likes || 0) + 1
        }
        
        return true
      }
      
      return false
    } catch (err) {
      console.error('Ошибка лайка статьи:', err)
      return false
    }
  }

  // Убрать лайк статьи
  const unlikeArticle = async (id: number): Promise<boolean> => {
    try {
      const response = await articlesApi.unlike(id)
      
      if (response.success) {
        // Обновляем счетчик лайков в списке
        const article = articles.value.find(a => a.id === id)
        if (article) {
          article.likes = Math.max(0, (article.likes || 0) - 1)
        }
        
        return true
      }
      
      return false
    } catch (err) {
      console.error('Ошибка снятия лайка статьи:', err)
      return false
    }
  }

  // Добавить в закладки
  const bookmarkArticle = async (id: number): Promise<boolean> => {
    try {
      const response = await articlesApi.bookmark(id)
      
      if (response.success) {
        // Помечаем статью как добавленную в закладки
        const article = articles.value.find(a => a.id === id)
        if (article) {
          // Добавляем поле isBookmarked если его нет в типах
          (article as any).isBookmarked = true
        }
        
        return true
      }
      
      return false
    } catch (err) {
      console.error('Ошибка добавления в закладки:', err)
      return false
    }
  }

  // Убрать из закладок
  const unbookmarkArticle = async (id: number): Promise<boolean> => {
    try {
      const response = await articlesApi.unbookmark(id)
      
      if (response.success) {
        // Помечаем статью как удаленную из закладок
        const article = articles.value.find(a => a.id === id)
        if (article) {
          (article as any).isBookmarked = false
        }
        
        return true
      }
      
      return false
    } catch (err) {
      console.error('Ошибка удаления из закладок:', err)
      return false
    }
  }

  // Получение черновиков
  const fetchDrafts = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await articlesApi.getDrafts()
      
      if (response.success && response.data) {
        articles.value = response.data.articles
        total.value = response.data.total
        initialized.value = true
      }
    } catch (err) {
      const apiError = err as ApiError
      error.value = errorUtils.getErrorMessage(apiError)
      console.error('Ошибка загрузки черновиков:', err)
    } finally {
      loading.value = false
    }
  }

  // Получение закладок
  const fetchBookmarked = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await articlesApi.getBookmarked()
      
      if (response.success && response.data) {
        articles.value = response.data.articles
        total.value = response.data.total
        initialized.value = true
      }
    } catch (err) {
      const apiError = err as ApiError
      error.value = errorUtils.getErrorMessage(apiError)
      console.error('Ошибка загрузки закладок:', err)
    } finally {
      loading.value = false
    }
  }

  // Вычисляемые свойства
  const filteredArticles = computed(() => {
    let result = articles.value

    // Применяем фильтры на клиенте (если нужно)
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      result = result.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    if (filters.value.tags && filters.value.tags.length > 0) {
      result = result.filter(article =>
        filters.value.tags!.some(tag => article.tags.includes(tag))
      )
    }

    if (filters.value.authorId) {
      result = result.filter(article => article.author.id === filters.value.authorId)
    }

    if (filters.value.status) {
      result = result.filter(article => article.status === filters.value.status)
    }

    return result
  })

  const isEmpty = computed(() => articles.value.length === 0 && !loading.value && initialized.value)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  return {
    // Состояние
    articles: filteredArticles,
    loading: isLoading,
    error,
    total,
    currentPage,
    hasMore,
    filters,
    pagination,
    initialized,

    // Вычисляемые свойства
    isEmpty,
    hasError,

    // Методы загрузки
    fetchArticles,
    loadMore,
    updateFilters,
    searchArticles,
    filterByTag,
    filterByAuthor,
    resetFilters,
    getArticleById,

    // CRUD операции
    createArticle,
    updateArticle,
    deleteArticle,

    // Взаимодействие с статьями
    likeArticle,
    unlikeArticle,
    bookmarkArticle,
    unbookmarkArticle,

    // Специальные списки
    fetchDrafts,
    fetchBookmarked
  }
}


