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
        console.warn('Using mock data due to network error in development mode')
        const mockResponse: ArticlesResponse = {
          articles: generateMockArticles(pagination.value.limit, pagination.value.page),
          total: 100,
          page: pagination.value.page,
          limit: pagination.value.limit,
          hasMore: pagination.value.page < 10
        }
        articles.value = mockResponse.articles
        total.value = mockResponse.total
        currentPage.value = mockResponse.page
        hasMore.value = mockResponse.hasMore
        error.value = null // Очищаем ошибку для моковых данных
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
        // Генерируем моковые данные для следующей страницы
        const mockResponse: ArticlesResponse = {
          articles: generateMockArticles(pagination.value.limit, nextPage),
          total: 100,
          page: nextPage,
          limit: pagination.value.limit,
          hasMore: nextPage < 10
        }

        // Добавляем к существующим статьям (для бесконечной прокрутки)
        articles.value.push(...mockResponse.articles)
        total.value = mockResponse.total
        currentPage.value = mockResponse.page
        hasMore.value = mockResponse.hasMore

      } catch (err) {
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
        return generateMockArticle(id)
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

// Функция для генерации моковых данных
function generateMockArticles(count: number, page: number = 1): Article[] {
  const mockArticles: Article[] = []
  const startId = (page - 1) * count + 1
  
  for (let i = 0; i < count; i++) {
    mockArticles.push(generateMockArticle(startId + i))
  }
  
  return mockArticles
}

function generateMockArticle(id: number): Article {
  const authors = [
    { id: 1, username: 'Аякиро', avatar: 'https://via.placeholder.com/85x85/434956/FFFFFF?text=A' },
    { id: 2, username: 'Developer', avatar: 'https://via.placeholder.com/85x85/6366f1/FFFFFF?text=D' },
    { id: 3, username: 'Designer', avatar: 'https://via.placeholder.com/85x85/10b981/FFFFFF?text=D' },
    { id: 4, username: 'Anonymous', avatar: undefined },
    { id: 5, username: 'Guest', avatar: undefined },
    { id: 6, username: 'NewUser', avatar: undefined }
  ]

  const tags = [
    ['Vue.js', 'TypeScript', 'Frontend'],
    ['React', 'JavaScript', 'Web'],
    ['Node.js', 'Backend', 'API'],
    ['CSS', 'Design', 'UI/UX'],
    ['Python', 'Django', 'Database']
  ]

  const titles = [
    'Как создать современное веб-приложение',
    'Основы TypeScript для начинающих',
    'Лучшие практики Vue.js разработки',
    'Создание адаптивного дизайна',
    'Оптимизация производительности веб-приложений',
    'Введение в React и его экосистему',
    'Современные подходы к CSS',
    'Работа с базами данных в Node.js',
    'Микросервисная архитектура',
    'DevOps практики для разработчиков',
    'Тестирование в JavaScript',
    'Паттерны проектирования в веб-разработке',
    'Безопасность веб-приложений',
    'Мобильная разработка с React Native',
    'GraphQL vs REST API'
  ]

  const author = authors[id % authors.length]
  const articleTags = tags[id % tags.length]
  const title = titles[id % titles.length]

  const excerpts = [
    `В этой обширной статье мы подробно и всесторонне рассмотрим современные подходы к веб-разработке, изучим проверенные временем лучшие практики и самые актуальные инструменты, которые помогут создавать качественные, масштабируемые и высокопроизводительные приложения. Мы детально обсудим архитектурные решения, различные паттерны программирования, принципы SOLID, чистую архитектуру и комплексную оптимизацию производительности. Особое внимание будет уделено современным фреймворкам, библиотекам, системам сборки, инструментам тестирования и процессам непрерывной интеграции и развертывания. Данный материал станет незаменимым руководством для разработчиков всех уровней подготовки.`,
    `Детальное и исчерпывающее руководство по использованию современных технологий в веб-разработке, охватывающее все аспекты создания профессиональных приложений. Узнайте, как правильно структурировать крупные проекты, организовать чистый и поддерживаемый код, настроить эффективный процесс разработки для максимальной продуктивности команды и долгосрочной поддерживаемости кодовой базы. В материале рассматриваются принципы модульной архитектуры, системы управления состоянием, оптимизация бандлов, прогрессивные веб-приложения, серверный рендеринг и многие другие важные аспекты современной разработки. Включены практические примеры, чек-листы и готовые решения для типовых задач.`,
    `Комплексный и глубокий обзор инструментов, методологий и передовых практик, которые помогут вам стать высококвалифицированным и востребованным разработчиком в современной IT-индустрии. От фундаментальных основ программирования до продвинутых техник и паттернов - всё что необходимо знать для успешной карьеры в сфере информационных технологий и создания качественных, конкурентоспособных программных продуктов. Материал охватывает алгоритмы и структуры данных, принципы объектно-ориентированного и функционального программирования, работу с базами данных, системное администрирование, облачные технологии и многое другое. Статья содержит реальные кейсы из практики ведущих IT-компаний.`,
    `Практические советы, проверенные рекомендации и экспертные инсайты от признанных лидеров и специалистов индустрии разработки программного обеспечения. Изучите множество проверенных временем подходов к эффективному решению сложных технических задач, оптимизации рабочих процессов и значительному повышению качества разрабатываемого программного обеспечения. В статье подробно рассматриваются методологии разработки, принципы проектирования систем, управление техническим долгом, code review процессы, автоматизация тестирования и развертывания. Особое внимание уделено вопросам масштабирования, производительности и безопасности приложений в enterprise-среде.`,
    'Детальное и исчерпывающее руководство по использованию современных технологий в веб-разработке, охватывающее все аспекты создания профессиональных приложений. Узнайте, как правильно структурировать крупные проекты, организовать чистый и поддерживаемый код, настроить эффективный процесс разработки для максимальной продуктивности команды и долгосрочной поддерживаемости кодовой базы. В материале рассматриваются принципы модульной архитектуры, системы управления состоянием, оптимизация бандлов, прогрессивные веб-приложения, серверный рендеринг и многие другие важные аспекты современной разработки. Включены практические примеры, чек-листы и готовые решения для типовых задач.',
    `Углубленное и всестороннее изучение современных тенденций, инновационных подходов и перспективных направлений в разработке программного обеспечения, их влияние на индустрию и будущее технологий. Детально рассматриваем новейшие технологии, революционные фреймворки и инновационные библиотеки, которые активно формируют и определяют будущее веб-разработки, мобильных приложений и enterprise-решений. Анализируем тренды в области искусственного интеллекта, машинного обучения, блокчейн-технологий, интернета вещей, дополненной и виртуальной реальности. Обсуждаем влияние этих технологий на архитектуру современных приложений, новые требования к производительности, безопасности и пользовательскому опыту.`,
    `В этой обширной статье мы подробно и всесторонне рассмотрим современные подходы к веб-разработке, изучим проверенные временем лучшие практики и самые актуальные инструменты, которые помогут создавать качественные, масштабируемые и высокопроизводительные приложения. Мы детально обсудим архитектурные решения, различные паттерны программирования, принципы SOLID, чистую архитектуру и комплексную оптимизацию производительности. Особое внимание будет уделено современным фреймворкам, библиотекам, системам сборки, инструментам тестирования и процессам непрерывной интеграции и развертывания. Данный материал станет незаменимым руководством для разработчиков всех уровней подготовки.`,
    `Детальное и исчерпывающее руководство по использованию современных технологий в веб-разработке, охватывающее все аспекты создания профессиональных приложений. Узнайте, как правильно структурировать крупные проекты, организовать чистый и поддерживаемый код, настроить эффективный процесс разработки для максимальной продуктивности команды и долгосрочной поддерживаемости кодовой базы. В материале рассматриваются принципы модульной архитектуры, системы управления состоянием, оптимизация бандлов, прогрессивные веб-приложения, серверный рендеринг и многие другие важные аспекты современной разработки. Включены практические примеры, чек-листы и готовые решения для типовых задач.`,
    `Комплексный и глубокий обзор инструментов, методологий и передовых практик, которые помогут вам стать высококвалифицированным и востребованным разработчиком в современной IT-индустрии. От фундаментальных основ программирования до продвинутых техник и паттернов - всё что необходимо знать для успешной карьеры в сфере информационных технологий и создания качественных, конкурентоспособных программных продуктов. Материал охватывает алгоритмы и структуры данных, принципы объектно-ориентированного и функционального программирования, работу с базами данных, системное администрирование, облачные технологии и многое другое. Статья содержит реальные кейсы из практики ведущих IT-компаний.`,
    `Практические советы, проверенные рекомендации и экспертные инсайты от признанных лидеров и специалистов индустрии разработки программного обеспечения. Изучите множество проверенных временем подходов к эффективному решению сложных технических задач, оптимизации рабочих процессов и значительному повышению качества разрабатываемого программного обеспечения. В статье подробно рассматриваются методологии разработки, принципы проектирования систем, управление техническим долгом, code review процессы, автоматизация тестирования и развертывания. Особое внимание уделено вопросам масштабирования, производительности и безопасности приложений в enterprise-среде.`,
    'Детальное и исчерпывающее руководство по использованию современных технологий в веб-разработке, охватывающее все аспекты создания профессиональных приложений. Узнайте, как правильно структурировать крупные проекты, организовать чистый и поддерживаемый код, настроить эффективный процесс разработки для максимальной продуктивности команды и долгосрочной поддерживаемости кодовой базы. В материале рассматриваются принципы модульной архитектуры, системы управления состоянием, оптимизация бандлов, прогрессивные веб-приложения, серверный рендеринг и многие другие важные аспекты современной разработки. Включены практические примеры, чек-листы и готовые решения для типовых задач.',
    `Углубленное и всестороннее изучение современных тенденций, инновационных подходов и перспективных направлений в разработке программного обеспечения, их влияние на индустрию и будущее технологий. Детально рассматриваем новейшие технологии, революционные фреймворки и инновационные библиотеки, которые активно формируют и определяют будущее веб-разработки, мобильных приложений и enterprise-решений. Анализируем тренды в области искусственного интеллекта, машинного обучения, блокчейн-технологий, интернета вещей, дополненной и виртуальной реальности. Обсуждаем влияние этих технологий на архитектуру современных приложений, новые требования к производительности, безопасности и пользовательскому опыту.`
  ]

  const contents = [
    `Полное и исчерпывающее руководство по современной веб-разработке включает в себя огромное множество важнейших аспектов: от тщательного выбора правильных технологий и архитектурных решений до организации максимально эффективного и продуктивного рабочего процесса в команде разработчиков. В этой обширной статье мы детально и пошагово рассмотрим абсолютно все этапы создания современного веб-приложения - начиная от первоначальной концепции и проектирования архитектуры, заканчивая финальным развертыванием в продакшн-среде и последующим мониторингом. Особое и пристальное внимание будет уделено критически важным архитектурным решениям, которые обеспечивают долгосрочную масштабируемость, высокую производительность и удобную поддерживаемость кодовой базы. Также мы подробно обсудим современные инструменты разработки, системы контроля версий, методологии автоматизации тестирования, процессы непрерывной интеграции и развертывания, мониторинг производительности и обеспечение безопасности приложений.`,
    `Современная профессиональная разработка программного обеспечения требует глубокого и всестороннего понимания не только основных языков программирования и их синтаксиса, но и обширной экосистемы разнообразных инструментов, фреймворков и библиотек, которые окружают современного разработчика в его ежедневной работе. В данном подробном и практически ориентированном материале мы комплексно рассмотрим проверенные временем лучшие практики организации архитектуры и структуры кода, изучим классические и современные паттерны проектирования, детально разберем фундаментальные принципы SOLID, концепции чистой архитектуры и domain-driven design. Особое внимание будет уделено критически важным вопросам оптимизации производительности на всех уровнях приложения, комплексному обеспечению безопасности веб-приложений и созданию превосходного пользовательского опыта. Статья насыщена практическими примерами, реальными кейсами из индустрии и готовыми решениями для типовых задач.`,
    `Экспертный и профессиональный взгляд на современные технологии, инновационные подходы и передовые методологии в разработке программного обеспечения от ведущих специалистов индустрии с многолетним опытом работы в крупных технологических компаниях. Мы детально рассматриваем и анализируем популярные фреймворки, библиотеки и инструменты разработки, проводим сравнительный анализ их преимуществ и потенциальных недостатков в различных сценариях использования. Подробно изучаем сложные процессы планирования архитектуры, проектирования пользовательских интерфейсов и реализации масштабных и технически сложных проектов. Обсуждаем различные методологии разработки (Agile, Scrum, Kanban), принципы эффективной командной работы, процессы code review и управления техническим долгом. Материал будет одинаково полезен как начинающим разработчикам, стремящимся освоить основы профессии, так и опытным специалистам, желающим углубить свои знания и изучить новые подходы.`,
    `Комплексное и многоаспектное исследование современных подходов к созданию высокопроизводительных и масштабируемых веб-приложений с особым акцентом на критически важные аспекты производительности, многоуровневой безопасности и горизонтальной масштабируемости систем. В статье подробно рассматриваются различные архитектурные паттерны и их применение в реальных проектах, микросервисная архитектура и ее преимущества, современные подходы к контейнеризации приложений с использованием Docker и Kubernetes, передовые облачные технологии и сервисы. Особое внимание уделено современным DevOps практикам, полной автоматизации процессов развертывания, комплексному мониторингу приложений в продакшн-среде, системам логирования и алертинга. Включены детальные практические рекомендации, готовые конфигурации и множество примеров реальных реализаций в enterprise-окружении.`,
    `Детальный и всесторонний анализ актуальных трендов в современной разработке программного обеспечения и их значительное влияние на развитие всей IT-индустрии в целом. Изучаем революционные новые технологии, которые кардинально меняют традиционные подходы к созданию программного обеспечения: искусственный интеллект и машинное обучение, блокчейн-технологии и децентрализованные приложения, интернет вещей и edge computing, дополненная и виртуальная реальность. Рассматриваем глубокое влияние этих инновационных технологий на архитектуру современных приложений, новые повышенные требования к производительности и оптимизации, усложняющиеся аспекты безопасности и защиты данных. Обсуждаем перспективы развития веб-разработки, мобильных технологий и навыки, которые будут критически востребованы на рынке труда в ближайшие годы. Материал включает прогнозы экспертов, статистику рынка и рекомендации по развитию карьеры в IT-сфере.`
  ]

  return {
    id,
    title,
    content: contents[id % contents.length],
    excerpt: excerpts[id % excerpts.length],
    author,
    tags: articleTags,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // случайная дата в последние 30 дней
    updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // случайная дата в последние 7 дней
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    status: 'published' as const,
    views: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 200) + 10,
    commentsCount: Math.floor(Math.random() * 50),
    featured: Math.random() > 0.8,
    category: ['Tutorial', 'Guide', 'Tips', 'News'][Math.floor(Math.random() * 4)],
    readingTime: Math.floor(Math.random() * 15) + 5
  }
}
