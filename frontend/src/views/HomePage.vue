<template>
  <div class="articles-page">
    <div class="articles-container">
      <!-- Articles Body -->
      <div class="articles-body">
      <!-- First Left Block - Search -->
      <div class="search-section">
        <div class="search-container">
                  <svg 
                    class="search-icon" 
                    :class="{ 'active': showFilterDropdown }"
                    width="32" 
                    height="28" 
                    viewBox="0 0 42 38" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    @click="toggleFilterDropdown"
                    style="cursor: pointer;"
                  >
            <path d="M39.6119 2H2L17.0448 19.7375V32L24.5672 35.75V19.7375L39.6119 2Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="search-divider"></div>
          <svg 
            class="search-icon-2" 
            width="28" 
            height="28" 
            viewBox="0 0 38 38" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            @click="handleSearch"
            style="cursor: pointer;"
          >
            <path d="M35.8507 35.75L27.6701 27.5937M32.0895 17C32.0895 25.2843 25.3538 32 17.0448 32C8.73577 32 2 25.2843 2 17C2 8.71573 8.73577 2 17.0448 2C25.3538 2 32.0895 8.71573 32.0895 17Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Search Bar -->
          <input
            type="text"
            class="search-input"
            :placeholder="$t('articles.search')"
            :value="searchQuery"
            @input="onSearchInput"
            @keydown.enter="handleSearch"
          >
          <!-- Clear Search Button -->
          <button
            v-if="searchQuery"
            @click="handleResetFilters"
            class="clear-search-btn"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Filter Dropdown -->
        <div 
          class="filter-dropdown"
          :class="{ 'show': showFilterDropdown }"
        >
          <div class="filter-section">
            <h4 class="filter-title">{{ $t('articles.filters.difficulty') }}</h4>
            <div class="difficulty-circles">
              <button 
                v-for="(label, difficulty) in difficultyOptions" 
                :key="difficulty"
                @click="handleDifficultyFilter(filters.difficulty === difficulty ? null : difficulty)"
                :class="['difficulty-circle', `difficulty-${difficulty}`, { 'selected': filters.difficulty === difficulty }]"
                :title="label"
                type="button"
              >
                <FireIcon class="difficulty-icon" />
              </button>
            </div>
          </div>

          <div class="filter-section">
            <h4 class="filter-title">{{ $t('articles.filters.readingTime') }}</h4>
            <div class="reading-time-inputs">
              <div class="time-input-group">
                <label>{{ $t('articles.filters.from') }}</label>
                <input 
                  type="number" 
                  :value="filters.readingTimeMin" 
                  @input="handleReadingTimeFilter($event.target.value ? Number($event.target.value) : null, filters.readingTimeMax)"
                  :placeholder="$t('articles.filters.minutes')"
                  min="0"
                  class="time-input"
                />
              </div>
              <div class="time-input-group">
                <label>{{ $t('articles.filters.to') }}</label>
                <input 
                  type="number" 
                  :value="filters.readingTimeMax" 
                  @input="handleReadingTimeFilter(filters.readingTimeMin, $event.target.value ? Number($event.target.value) : null)"
                  :placeholder="$t('articles.filters.minutes')"
                  min="0"
                  class="time-input"
                />
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h4 class="filter-title">{{ $t('articles.filters.tags') }}</h4>
            <div class="filter-tags">
              <button 
                v-for="tag in availableTags" 
                :key="tag"
                @click="handleTagFilter(tag)"
                :class="['filter-tag', { active: filters.tags.includes(tag) }]"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <div class="filter-actions">
            <button @click="handleResetFilters" class="filter-reset-btn">
              {{ $t('articles.filters.reset') }}
            </button>
            <button @click="toggleFilterDropdown" class="filter-close-btn">
              {{ $t('articles.filters.close') }}
            </button>
          </div>
        </div>

        <!-- Articles Container -->
        <div 
          class="articles-list-container"
          :class="{ 'shifted-down': showFilterDropdown }"
        >
          <!-- Loading State -->
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text" >Loading articles...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="isEmpty" class="empty-state">
            <h3 v-if="isSearching">{{ $t('articles.searchResults.noResults', { query: searchQuery }) }}</h3>
            <h3 v-else>{{ $t('common.no_articles') }}</h3>
            <p v-if="isSearching">{{ $t('articles.searchResults.noResultsDescription') }}</p>
            <p v-else>{{ $t('articles.searchResults.noResultsDescription') }}</p>
            <button @click="handleResetFilters" class="reset-filters-btn">
              {{ isSearching ? $t('articles.searchResults.showAll') : $t('articles.searchResults.resetFilters') }}
            </button>
          </div>

          <!-- Articles List -->
          <template v-else>
            <!-- Search Results Header -->
            <div v-if="isSearching" class="search-results-header">
              <h3>{{ $t('articles.searchResults.title', { query: searchQuery }) }}</h3>
              <p class="search-results-count">{{ $t('articles.searchResults.count', { count: totalRecords }) }}</p>
            </div>
            
            <ArticleCard
              v-for="article in paginatedArticles"
              :key="article.id"
              :article="article"
              @tag-click="handleTagClick"
              @author-click="handleAuthorClick"
              @article-click="handleArticleClick"
            />
          </template>

          <!-- Pagination -->
          <div v-if="!loading && !isEmpty" class="pagination-container">
            <Paginator
              v-model:first="first"
              :rows="rows"
              :totalRecords="totalRecords"
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              @page="handlePageChange"
            />
          </div>
        </div>

        <!-- Back to Top Button -->
        <button
          class="back-to-top-btn"
          @click="scrollToTop"
          :class="{ visible: showBackToTop }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <!-- Second Right Block - Sidebar -->
      <div class="sidebar-section">
        <!-- Article Info -->
        <div class="article-info-card">
          <div class="card-header">
            <svg class="card-icon" width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7083 1.41666L1.625 15.9167H12.5L11.2917 25.5833L23.375 11.0833H12.5L13.7083 1.41666Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 class="card-title">{{ $t('articles.info.title') }}</h2>
          </div>

          <div class="info-item">
            <p class="info-label">{{ $t('articles.info.date') }}</p>
            <p class="info-value">unknown</p>
          </div>

          <div class="info-item">
            <p class="info-label">{{ $t('articles.info.likes') }}</p>
            <p class="info-value">unknown</p>
          </div>

          <div class="info-item">
            <p class="info-label">{{ $t('articles.info.views') }}</p>
            <p class="info-value">unknown</p>
          </div>

          <div class="info-item">
            <p class="info-label">{{ $t('articles.info.comments') }}</p>
            <p class="info-value">unknown</p>
          </div>

          <div class="info-item">
            <p class="info-label">{{ $t('articles.info.symbols') }}</p>
            <p class="info-value">unknown</p>
          </div>
        </div>

        <!-- Similar Articles -->
        <div class="similar-articles-card">
          <div class="card-header">
            <svg class="card-icon" width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7083 1.41666L1.625 15.9167H12.5L11.2917 25.5833L23.375 11.0833H12.5L13.7083 1.41666Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 class="card-title">{{ $t('articles.similar.title') }}</h2>
          </div>

          <div class="similar-item">{{ $t('articles.similar.nothing') }}</div>
          <div class="similar-item">{{ $t('articles.similar.nothing') }}</div>
          <div class="similar-item">{{ $t('articles.similar.nothing') }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import ArticleCard from '@/components/ArticleCard.vue'
import Paginator from 'primevue/paginator'
import FireIcon from '@/assets/svgs/fire_ico.svg'

import { useArticles } from '@/composables/useArticles'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
// Используем composable для работы со статьями
const {
  articles,
  loading,
  error,
  fetchArticles,
  searchArticles
} = useArticles()

// Вычисляемые свойства
const isEmpty = computed(() => articles.value.length === 0)
const totalRecords = computed(() => articles.value.length)

const first = ref(0)
const rows = ref(10)

// Пагинированные статьи - показываем только 10 статей на текущей странице
const paginatedArticles = computed(() => {
  const start = first.value
  const end = start + rows.value
  return articles.value.slice(start, end)
})
const showBackToTop = ref(false)
const buttonOpacity = ref(1)
const searchQuery = ref('')
const isSearching = ref(false)

// Filter states
const showFilterDropdown = ref(false)
const filters = ref({
  difficulty: null, // 'easy', 'medium', 'hard'
  readingTimeMin: null,
  readingTimeMax: null,
  tags: []
})
const availableTags = ref([])

// Difficulty options for filter
const difficultyOptions = computed(() => ({
  easy: t('create-article.difficulty.easy'),
  medium: t('create-article.difficulty.medium'),
  hard: t('create-article.difficulty.hard')
} as Record<string, string>))

// const onPageChange = async (event: any) => {
//   first.value = event.first
//   rows.value = event.rows
//   console.log('Page changed:', event)
//
//   // Загружаем статьи для новой страницы
//   await fetchArticles({}, {
//     page: Math.floor(event.first / event.rows) + 1,
//     limit: event.rows
//   })
// }

// Обработчики событий ArticleCard
const handleTagClick = (tag: string) => {
  console.log('Клик по тегу:', tag)
  // TODO: Реализовать фильтрацию по тегу
}

const handleAuthorClick = (authorId: number) => {
  console.log('Клик по автору:', authorId)
  // TODO: Реализовать фильтрацию по автору
}

const handleArticleClick = (articleId: number) => {
  console.log('Клик по статье:', articleId)
  // Переход к полной статье
  router.push(`/article/${articleId}`)
}

// Обработчик поиска
const handleSearch = async () => {
  console.log('Поиск:', searchQuery.value)
  
  // Отменяем текущий таймаут при ручном запуске поиска
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
    searchTimeout.value = null
  }
  
  if (searchQuery.value.trim().length < 2) {
    // Если запрос слишком короткий, загружаем все статьи
    isSearching.value = false
    await fetchArticles()
    return
  }
  
  isSearching.value = true
  try {
    await searchArticles(searchQuery.value.trim())
  } catch (error) {
    console.error('Ошибка поиска:', error)
  }
}

// Обработчик изменения поискового запроса
const onSearchInput = async (event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value

  // Дебаунс для поиска
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = setTimeout(() => {
    handleSearch()
  }, 500)
}

const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

// Дополнительные обработчики
const handleResetFilters = async () => {
  searchQuery.value = ''
  isSearching.value = false
  filters.value = {
    difficulty: null,
    readingTimeMin: null,
    readingTimeMax: null,
    tags: []
  }
  showFilterDropdown.value = false
  console.log('Фильтры сброшены')
  // Загружаем все статьи при сбросе фильтров
  await fetchArticles()
}

// Filter handlers
const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.search-section')) {
    showFilterDropdown.value = false
  }
}

const handleDifficultyFilter = (difficulty: string | null) => {
  filters.value.difficulty = difficulty
  applyFilters()
}

const handleReadingTimeFilter = (min: number | null, max: number | null) => {
  filters.value.readingTimeMin = min
  filters.value.readingTimeMax = max
  applyFilters()
}

const handleTagFilter = (tag: string) => {
  const index = filters.value.tags.indexOf(tag)
  if (index > -1) {
    filters.value.tags.splice(index, 1)
  } else {
    filters.value.tags.push(tag)
  }
  applyFilters()
}

const applyFilters = async () => {
  // TODO: Реализовать применение фильтров
  console.log('Применяем фильтры:', filters.value)
}

const handlePageChange = (event: any) => {
  first.value = event.first
  rows.value = event.rows
  console.log('Page changed:', event)
  
  // Прокручиваем страницу вверх при смене страницы
  scrollToTop()
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  // Show button when scrolling down more than 300px
  showBackToTop.value = scrollY > 300

  // Find the footer and button elements
  const footer = document.querySelector('.footer-container') as HTMLElement
  const backToTopBtn = document.querySelector('.back-to-top-btn') as HTMLElement

  if (footer && backToTopBtn) {
    const footerRect = footer.getBoundingClientRect()
    const footerTop = footerRect.top
    const fadeDistance = 100 // distance to start fading

    // Calculate opacity based on distance to footer
    let opacity = 1
    if (footerTop <= windowHeight + fadeDistance) {
      const distanceToFooter = footerTop - windowHeight
      if (distanceToFooter <= 0) {
        // Footer is visible - hide button completely
        opacity = 0
      } else {
        // Footer is approaching - fade out
        opacity = Math.min(1, distanceToFooter / fadeDistance)
      }
    }

    // Apply opacity
    buttonOpacity.value = opacity
    backToTopBtn.style.opacity = opacity.toString()

    // Always use fixed positioning to avoid "flying to stratosphere" issue
    backToTopBtn.style.position = 'fixed'
    backToTopBtn.style.bottom = '30px'
    backToTopBtn.style.left = '30px'
    backToTopBtn.style.top = 'auto'
    backToTopBtn.classList.remove('above-footer')
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  await fetchArticles()
  console.log('Статьи загружены следующие:', articles.value)
  
  // Получаем уникальные теги из загруженных статей
  const allTags = new Set()
  articles.value.forEach(article => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach(tag => allTags.add(tag))
    }
  })
  availableTags.value = Array.from(allTags).sort()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@import '@/assets/main.scss';

.articles-page {
  background-color: var(--bg-primary);
  min-height: 100vh;
  width: 100%;
}

.articles-page .articles-container {
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 0 12px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 20px;
    max-width: 1000px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    padding: 0 24px;
    max-width: 1400px;
  }
}

/* Articles Body */
.articles-body {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
    gap: 12px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    margin-top: 30px;
    gap: 14px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    margin-top: 40px;
    gap: 16px;
  }
}

/* First Left Block - Search Section */
.search-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-container {
  background-color: var(--bg-secondary);
  border-radius: 32px;
  display: flex;
  align-items: center;
  position: relative;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 100%;
    height: 50px;
    border-radius: 25px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
    max-width: 700px;
    height: 60px;
    border-radius: 30px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    width: 1060px;
    height: 70px;
    border-radius: 32px;
  }
}

.search-icon {
  margin-left: 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: var(--text-secondary);
}

.search-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
  color: var(--text-primary);
}

.search-icon:active {
  transform: scale(0.95);
}

.search-icon.active {
  color: var(--primary-violet);
  transform: scale(1.15);
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.4));
}

.search-icon.active:hover {
  color: #3b82f6;
  filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.6));
}

.search-divider {
  width: 2px;
  height: 38px;
  margin-left: 20px;
  background-color: white;
  border-radius: 30px;
  opacity: 0.3;
}

.search-icon-2 {
  margin-left: 20px;
  transition: all 0.2s ease;
}

.search-icon-2:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.search-icon-2:active {
  transform: scale(0.95);
}

.search-input {
  margin-left: 16px;
  width: 912px;
  height: 50px;
  background-color: var(--bg-primary);
  border-radius: 25px;
  color: var(--text-primary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  padding-left: 16px;
  padding-right: 60px; /* Отступ для кнопки очистки */
  border: none;
  outline: none;
}

.search-input::placeholder {
  color: var(--text-third);
  opacity: 0.3;
}

/* Clear Search Button */
.clear-search-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.clear-search-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  transform: translateY(-50%) scale(1.1);
}

.loading-text {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
}

/* Articles List Container */
.articles-list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
    max-width: 700px;
    gap: 18px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    width: 1060px;
    gap: 20px;
  }
}

/* Search Results Header */
.search-results-header {
  background-color: var(--bg-secondary);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 10px;
  border-left: 4px solid var(--primary-violet);
}

.search-results-header h3 {
  color: var(--text-primary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0 0 8px 0;
}

.search-results-count {
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;
}

/* Pagination Container */
.pagination-container {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 3px;
  background-color: transparent;
}

/* PrimeVue Paginator - Community Colors */
:deep(.p-paginator) {
  background-color: transparent !important;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  color: var(--text-primary);
  font-family: var(--font-sans);
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page:hover) {
  background-color: transparent !important;
  color: #3b82f6 !important; /* Подсвечиваем саму цифру */
  transform: scale(1.1); /* Немного увеличиваем для эффекта */
  transition: all 0.2s ease;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight),
:deep(.p-paginator .p-paginator-pages .p-paginator-page[aria-current="page"]),
:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-paginator-page-current) {
  background-color: transparent !important;
  color: #8b5cf6 !important; /* Активная страница - фиолетовый цвет цифры */
  font-weight: bold; /* Делаем жирной для выделения */
  transform: scale(1.2); /* Увеличиваем активную страницу */
}

/* Override any green colors */
:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  background-color: transparent !important;
  transition: all 0.2s ease; /* Плавная анимация для всех страниц */
}

:deep(.p-paginator .p-paginator-first),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-last) {
  color: var(--text-primary);
  font-family: var(--font-sans);
  transition: all 0.2s ease;
}

:deep(.p-paginator .p-paginator-first:hover),
:deep(.p-paginator .p-paginator-prev:hover),
:deep(.p-paginator .p-paginator-next:hover),
:deep(.p-paginator .p-paginator-last:hover) {
  background-color: transparent !important;
  color: #3b82f6 !important; /* Подсвечиваем сами иконки */
  transform: scale(1.1); /* Немного увеличиваем для эффекта */
  transition: all 0.2s ease;
}

:deep(.p-paginator .p-paginator-first:disabled),
:deep(.p-paginator .p-paginator-prev:disabled),
:deep(.p-paginator .p-paginator-next:disabled),
:deep(.p-paginator .p-paginator-last:disabled) {
  color: var(--text-secondary);
  opacity: 0.6;
}

/* Back to Top Button */
.back-to-top-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  background-color: var(--primary-violet);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease, visibility 0.3s ease, transform 0.3s ease;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.back-to-top-btn.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top-btn:hover {
  background-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.back-to-top-btn:active {
  transform: translateY(0);
}


/* Loading and Empty States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--bg-secondary);
  border-top: 4px solid var(--btn-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  color: var(--text-secondary);
}

.empty-state h3 {
  color: var(--text-primary);
  font-size: 24px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 10px;
}

.empty-state p {
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 20px;
}

.reset-filters-btn {
  background-color: var(--btn-primary);
  color: var(--text-primary);
  border: none;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 8px;
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.reset-filters-btn:hover {
  background-color: var(--btn-primary-hover);
  transform: translateY(-1px);
}

/* Second Right Block - Sidebar Section */
.sidebar-section {
  display: flex;
  flex-direction: column;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 280px;
    flex-shrink: 0;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    width: 300px;
    flex-shrink: 0;
  }
}

/* Article Info Card */
.article-info-card {
  background-color: var(--bg-secondary);
  border-radius: 30px;
  display: flex;
  flex-direction: column;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 100%;
    height: 350px;
    border-radius: 25px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 280px;
    height: 380px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    width: 300px;
    height: 400px;
  }
}

.card-header {
  display: flex;
  margin-top: 24px;
}

.card-icon {
  margin-left: 24px;
  margin-top: 4px;
}

.card-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 0;
}

.info-item {
  display: flex;
  margin-top: 24px;
  margin-left: 24px;
}

.info-label {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin: 0;
}

.info-value {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin-left: 8px;
  margin: 0;
}

/* Similar Articles Card */
.similar-articles-card {
  background-color: var(--bg-secondary);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 100%;
    height: 350px;
    border-radius: 25px;
    margin-top: 12px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 280px;
    height: 380px;
    margin-top: 14px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    width: 300px;
    height: 400px;
    margin-top: 16px;
  }
}

.similar-item {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin-top: 24px;
  margin-left: 24px;
  margin-bottom: 0;
  margin-right: 0;
}

/* Articles Container Animation */
.articles-list-container {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.articles-list-container.shifted-down {
  transform: translateY(50px);
}

/* Filter Dropdown */
.filter-dropdown {
  background-color: var(--bg-secondary);
  border-radius: 16px;
  padding: 0;
  margin-top: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--bg-primary);
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-dropdown.show {
  max-height: 600px;
  padding: 24px;
  opacity: 1;
  transform: translateY(0);
}

.filter-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-section:last-of-type {
  margin-bottom: 0;
}

.filter-title {
  color: var(--text-primary);
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0 0 12px 0;
}

.difficulty-circles {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.difficulty-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.difficulty-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.difficulty-circle:focus {
  outline: none;
  border-color: var(--primary-violet);
}

/* Color variants for different difficulties */
.difficulty-circle.difficulty-easy:hover {
  border-color: rgba(34, 197, 94, 0.7);
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.difficulty-circle.difficulty-easy.selected {
  border-color: #22c55e;
  background-color: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.difficulty-circle.difficulty-medium:hover {
  border-color: rgba(245, 158, 11, 1);
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.difficulty-circle.difficulty-medium.selected {
  border-color: #f59e0b;
  background-color: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.difficulty-circle.difficulty-hard:hover {
  border-color: rgba(239, 68, 68, 1);
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.difficulty-circle.difficulty-hard.selected {
  border-color: #ef4444;
  background-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.difficulty-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  fill: currentColor;
}

.difficulty-circle:hover .difficulty-icon {
  transform: scale(1.1);
}

.difficulty-circle.selected .difficulty-icon {
  transform: scale(1.1);
}

/* Цвета для иконок в зависимости от сложности */
.difficulty-circle.difficulty-easy .difficulty-icon {
  fill: #22c55e !important;
}

.difficulty-circle.difficulty-medium .difficulty-icon {
  fill: #f59e0b !important;
}

.difficulty-circle.difficulty-hard .difficulty-icon {
  fill: #ef4444 !important;
}

/* Hover эффекты для иконок */
.difficulty-circle:hover .difficulty-icon {
  transform: scale(1.1);
}

/* ЗАПОЛНЕНИЕ иконки цветом при выборе */
.difficulty-circle.selected.difficulty-easy .difficulty-icon {
  fill: #16a34a !important; /* Полное заполнение зеленым */
}

.difficulty-circle.selected.difficulty-medium .difficulty-icon {
  fill: #d97706 !important; /* Полное заполнение оранжевым */
}

.difficulty-circle.selected.difficulty-hard .difficulty-icon {
  fill: #dc2626 !important; /* Полное заполнение красным */
}

.reading-time-inputs {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.time-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 120px;
}

.time-input-group label {
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.time-input {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: var(--font-sans);
  font-weight: bold;
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
}

.time-input:focus {
  border-color: var(--primary-violet);
}

.time-input::placeholder {
  color: var(--text-third);
  opacity: 0.6;
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: auto;
  padding: 8px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-tag {
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
  font-family: var(--font-sans);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-tag:hover {
  background-color: var(--btn-primary);
  color: var(--text-primary);
}

.filter-tag.active {
  background-color: var(--primary-violet);
  color: white;
  border-color: var(--primary-violet);
}

.filter-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--bg-primary);
}

.filter-reset-btn,
.filter-close-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-sans);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.filter-reset-btn {
  background-color: var(--bg-primary);
  color: var(--text-secondary);
}

.filter-reset-btn:hover {
  background-color: var(--btn-primary);
  color: var(--text-primary);
}

.filter-close-btn {
  background-color: var(--primary-violet);
  color: white;
}

.filter-close-btn:hover {
  background-color: #3b82f6;
}

/* Mobile responsiveness for filter dropdown */
@media (max-width: 768px) {
  .filter-dropdown {
    margin-top: 12px;
    padding: 16px;
  }
  
  .reading-time-inputs {
    flex-direction: column;
  }
  
  .time-input-group {
    min-width: 100%;
  }
  
  .filter-actions {
    flex-direction: column;
  }
  
  .filter-reset-btn,
  .filter-close-btn {
    width: 100%;
  }
}

</style>
