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
      
      <!-- Comments Section -->
      <div class="comments-section">
        <h2 class="comments-title">Комментарии ({{ comments.length }})</h2>
        
        <!-- Comment Input -->
        <div class="comment-input-container">
          <div class="user-avatar-small">
            <svg
              class="question-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 17H12.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <textarea
            v-model="newComment"
            class="comment-input"
            placeholder="Написать комментарий..."
            rows="3"
            @keydown.ctrl.enter="addComment"
          ></textarea>
          <button class="submit-comment-btn" @click="addComment" :disabled="!newComment.trim()">
            Отправить
          </button>
        </div>
        
        <!-- Comments List -->
        <div class="comments-list">
          <CommentBlock
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            @like="handleCommentLike"
            @reply="handleCommentReply"
            @user-click="handleUserClick"
          />
          
          <div v-if="comments.length === 0" class="no-comments">
            <p>Будьте первым, кто оставит комментарий!</p>
          </div>
        </div>
      </div>
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
import CommentBlock from '@/components/CommentBlock.vue'
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
const newComment = ref('')

// Временные данные для комментариев (TODO: заменить на реальные данные с бэкенда)
const comments = ref([
  {
    id: 1,
    author: {
      id: 1,
      username: 'Александр',
      avatar: ''
    },
    text: 'Отличная статья! Очень полезная информация, спасибо за подробное описание.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 5,
    userLiked: false
  },
  {
    id: 2,
    author: {
      id: 2,
      username: 'Мария',
      avatar: ''
    },
    text: 'Интересный подход к решению проблемы. Попробую применить на практике.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 3,
    userLiked: false
  },
  {
    id: 3,
    author: {
      id: 3,
      username: 'Дмитрий',
      avatar: ''
    },
    text: 'Можете подсказать, где можно найти больше информации по этой теме?',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 1,
    userLiked: false
  }
])

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

// Обработчики комментариев
const addComment = () => {
  if (!newComment.value.trim()) return
  
  const comment = {
    id: comments.value.length + 1,
    author: {
      id: 999,
      username: 'Гость',
      avatar: ''
    },
    text: newComment.value.trim(),
    createdAt: new Date().toISOString(),
    likes: 0,
    userLiked: false
  }
  
  comments.value.unshift(comment)
  newComment.value = ''
}

const handleCommentLike = (commentId: number) => {
  console.log('Like comment:', commentId)
  // TODO: Реализовать лайк комментария
}

const handleCommentReply = (commentId: number) => {
  console.log('Reply to comment:', commentId)
  // TODO: Реализовать ответ на комментарий
}

const handleUserClick = (userId: number) => {
  console.log('User clicked:', userId)
  // TODO: Перейти на профиль пользователя
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

/* Comments Section */
.comments-section {
  margin-top: 40px;
  padding: 0;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.comments-title {
  color: var(--text-primary);
  font-size: 28px;
  font-family: var(--font-sans);
  font-weight: 700;
  margin-bottom: 24px;
}

.comment-input-container {
  background-color: var(--bg-secondary);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--btn-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  flex-shrink: 0;
}

.comment-input {
  width: 100%;
  background-color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-sans);
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: 2px solid var(--btn-primary);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
}

.submit-comment-btn {
  background-color: var(--btn-primary);
  color: var(--text-primary);
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  
  &:hover:not(:disabled) {
    background-color: var(--btn-primary-hover, #2563eb);
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.comments-list {
  margin-top: 24px;
}

.no-comments {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
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
  
  .comments-section {
    margin-top: 30px;
    padding: 0;
  }
  
  .comments-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .comment-input-container {
    padding: 16px;
    border-radius: 16px;
  }
  
  .comment-input {
    font-size: 14px;
    min-height: 70px;
  }
  
  .submit-comment-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* Планшеты */
@media (min-width: 769px) and (max-width: 1024px) {
  .comments-section {
    padding: 0;
  }
  
  .comments-title {
    font-size: 26px;
  }
}
</style>
  