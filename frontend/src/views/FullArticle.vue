<template>
  <div class="full-article-page">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">{{ $t('common.loading') }}</p>
    </div>
    
    <div v-else-if="error" class="error-container">
      <h1 class="error-text">{{ $t('common.error') }}</h1>
      <p class="error-message">{{ error }}</p>
      <button @click="goBack" class="back-button">{{ $t('common.go_back') }}</button>
    </div>
    
    <div v-else-if="article" class="article-container">
      <FullArticleCard :article="article" />
    </div>
    
    <div v-else class="not-found-container">
      <h1 class="not-found-text">{{ $t('common.article_not_found') }}</h1>
      <button @click="goBack" class="back-button">{{ $t('common.go_back') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import FullArticleCard from '@/components/FullArticleCard.vue'
import { useArticles } from '@/composables/useArticles'
import type { Article } from '@/types/article'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { getArticle } = useArticles()

// Состояния
const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Получение ID статьи из роута
const articleId = ref<number>(parseInt(route.params.id as string))

// Загрузка статьи
const loadArticle = async () => {
  try {
    loading.value = true
    error.value = null
    
    if (isNaN(articleId.value)) {
      throw new Error('Invalid article ID')
    }
    
    const fetchedArticle = await getArticle(articleId.value)
    article.value = fetchedArticle
  } catch (err) {
    console.error('Error loading article:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  } finally {
    loading.value = false
  }
}

// Возврат назад
const goBack = () => {
  router.go(-1)
}

// Загрузка при монтировании
onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.full-article-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-container,
.error-container,
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
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

.loading-text,
.error-text,
.not-found-text {
  color: var(--text-primary);
  font-size: 24px;
  font-family: var(--font-sans);
  font-weight: 600;
  margin-bottom: 10px;
}

.error-message {
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
  margin-bottom: 20px;
}

.back-button {
  background-color: var(--btn-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--btn-primary-hover, #2563eb);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .full-article-page {
    padding: 10px;
  }
  
  .loading-text,
  .error-text,
  .not-found-text {
    font-size: 20px;
  }
}
</style>
  