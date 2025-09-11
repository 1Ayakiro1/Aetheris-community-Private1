<template>
  <div class="article-card" @click="onArticleClick">
    <!-- Header -->
    <div class="article-card-header">
        <div class="logo" @click.stop="onAuthorClick">
          <img 
            v-if="article.author.avatar" 
            :src="article.author.avatar" 
            :alt="article.author.username"
            class="avatar-image"
          />
          <div v-else class="avatar-placeholder">
            <svg 
              class="question-icon" 
              width="32" 
              height="32" 
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
        </div>
        <div class="nickname-container" @click.stop="onAuthorClick">
            <h2 class="nickname">{{ article.author.username }}</h2>
            <h2 class="publication-time">{{ formatDate(article.createdAt) }}</h2>
        </div>
    </div>
    <!-- Content -->
    <div class="article-card-content">
        <h2 class="article-card-content-title">{{ article.title }}</h2>
        
        <!-- Metadata Panel -->
        <div class="metadata-panel">
            <div class="metadata-item difficulty">
                <i class="pi pi-chart-line metadata-icon"></i>
                <span class="metadata-text">complex</span>
            </div>
            <div class="metadata-item time">
                <i class="pi pi-clock metadata-icon"></i>
                <span class="metadata-text">22 min</span>
            </div>
            <div class="metadata-item views">
                <i class="pi pi-eye metadata-icon"></i>
                <span class="metadata-text">3</span>
            </div>
        </div>
        
        <div class="tags-container">
            <Tag 
              v-for="(tag, index) in article.tags" 
              :key="index"
              :value="tag"
              class="custom-tag"
              @click="onTagClick(tag)"
            >
              <template #default>
                <i class="pi pi-hashtag" style="font-size: 12px; margin-right: 6px; font-weight: 900;"></i>
                <span>{{ tag }}</span>
              </template>
            </Tag>
        </div>
        <div class="article-card-content-text" :data-text="article.excerpt || article.content">
            {{ article.excerpt || article.content }}
        </div>
    </div>
    
    <!-- Footer block with icons and read more button -->
    <div class="article-card-footer">
        <div class="article-actions">
            <div class="action-group">
                <button class="action-btn like-btn" @click.stop="onLike" :class="{ 'active': isLiked }">
                    <svg class="heart-icon" :class="{ 'filled': isLiked }" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                              stroke="currentColor" 
                              stroke-width="2" 
                              stroke-linecap="round" 
                              stroke-linejoin="round"
                              :fill="isLiked ? 'currentColor' : 'none'"
                        />
                    </svg>
                    <span class="action-count">{{ likesCount }}</span>
                </button>
                
                <button class="action-btn dislike-btn" @click.stop="onDislike" :class="{ 'active': isDisliked }">
                    <i class="pi pi-thumbs-down"></i>
                    <span class="action-count">{{ dislikesCount }}</span>
                </button>
                
                <button class="action-btn comment-btn" @click.stop="onComment">
                    <i class="pi pi-comment"></i>
                    <span class="action-count">{{ commentsCount }}</span>
                </button>
                
                <button class="action-btn bookmark-btn" @click.stop="onBookmark" :class="{ 'active': isBookmarked }">
                    <i class="pi pi-bookmark" :class="{ 'pi-bookmark-fill': isBookmarked }"></i>
                </button>
                
                <button class="action-btn share-btn" @click.stop="onShare">
                    <i class="pi pi-share-alt"></i>
                </button>
            </div>
        </div>
        
        <button class="read-more-btn" @click.stop="onArticleClick">
            Читать далее
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Article, ArticleCardProps, ArticleCardEmits } from '../types/article'
import Tag from 'primevue/tag'

// Пропсы компонента
const props = defineProps<ArticleCardProps>()

// Эмиты для событий
const emit = defineEmits<ArticleCardEmits>()

// Реактивные состояния для взаимодействий
const isLiked = ref(false)
const isDisliked = ref(false)
const isBookmarked = ref(false)
const likesCount = ref(props.article.likes || 0)
const dislikesCount = ref(props.article.dislikes || 0)
const commentsCount = ref(props.article.comments || 0)

// Date formatting
const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Yesterday'
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} weeks ago`
  } else {
    return dateObj.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }
}

// Обработчики событий
const onTagClick = (tag: string) => {
  emit('tagClick', tag)
}

const onAuthorClick = () => {
  emit('authorClick', props.article.author.id)
}

const onArticleClick = () => {
  emit('articleClick', props.article.id)
}

// Обработчики взаимодействий
const onLike = () => {
  if (isDisliked.value) {
    isDisliked.value = false
    dislikesCount.value = Math.max(0, dislikesCount.value - 1)
  }
  
  isLiked.value = !isLiked.value
  likesCount.value += isLiked.value ? 1 : -1
  likesCount.value = Math.max(0, likesCount.value)
}

const onDislike = () => {
  if (isLiked.value) {
    isLiked.value = false
    likesCount.value = Math.max(0, likesCount.value - 1)
  }
  
  isDisliked.value = !isDisliked.value
  dislikesCount.value += isDisliked.value ? 1 : -1
  dislikesCount.value = Math.max(0, dislikesCount.value)
}

const onComment = () => {
  // Переход к комментариям или открытие модального окна
  emit('articleClick', props.article.id)
}

const onBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  // Здесь можно добавить логику сохранения в избранное
}

const onShare = () => {
  // Логика для шаринга статьи
  if (navigator.share) {
    navigator.share({
      title: props.article.title,
      url: window.location.origin + `/articles/${props.article.id}`
    })
  } else {
    // Fallback - копирование ссылки в буфер обмена
    navigator.clipboard.writeText(window.location.origin + `/articles/${props.article.id}`)
  }
}



</script>

<style scoped>
.article-card {
    width: 1055px;
    height: 600px;
    background-color: var(--bg-secondary);
    border-radius: 40px 40px 15px 40px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
}

.article-card-header {
    display: flex;
    height: 108px;
    width: 100%;
    flex-direction: row;
    align-items: center;
}

.logo {
    width: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    background-color: #434956;
    border-radius: 100%;
    margin-left: 30px;
    margin-top: 55px;
    margin-bottom: 24px;
    margin-right: 24px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--btn-primary);
    color: var(--text-primary);
    font-size: 32px;
    font-weight: 700;
    font-family: var(--font-sans);
}

.question-icon {
    color: var(--text-primary);
    transition: all 0.2s ease-in-out;
}

.avatar-placeholder:hover .question-icon {
    color: #FFFFFF;
    transform: scale(1.1);
}

.nickname {
    color: var(--text-primary);
    font-size: 25px;
    font-family: var(--font-sans);
    font-weight: 700;
}

.nickname-container {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover .nickname {
        color: var(--btn-primary);
    }
}

.publication-time {
    color: var(--text-secondary);
    font-size: 20px;
    font-family: var(--font-sans);
    font-weight: 500;
}

.article-card-content {
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    margin-left: 30px;
    margin-right: 30px;
    height: calc(100% - 188px); /* Высота карточки минус header (108px) и footer (80px) */
    overflow: hidden;
    position: relative;
}

.article-card-content-title {
    color: var(--text-primary);
    font-size: 25px;
    font-family: var(--font-sans);
    font-weight: 700;
}

.metadata-panel {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
}

.metadata-item {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}

.metadata-item.difficulty {
    padding: 8px 16px;
    border-radius: 40px;
    background-color: rgba(239, 68, 68, 0.2);
    min-width: 60px;
    height: 32px;
    transition: all 0.3s ease;
}

.metadata-item.difficulty .metadata-icon,
.metadata-item.difficulty .metadata-text {
    color: #DC2626;
}

.metadata-icon {
    font-size: 16px;
    color: #6B7280;
}

.metadata-text {
    font-size: 16px;
    font-family: var(--font-sans);
    font-weight: 500;
    color: #6B7280;
}

.tags-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
}

.custom-tag {
    background-color: rgba(255, 255, 255, 0.2) !important;
    min-width: 60px;
    height: 28px !important;
    padding: 0 12px !important;
    border-radius: 7px !important;
    font-size: 14px !important;
    font-family: var(--font-sans) !important;
    font-weight: 420 !important;
    color: rgba(255, 255, 255, 0.6) !important;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    letter-spacing: 1px;
    text-transform: lowercase;
    border: none !important;
    margin-right: 10px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.4) !important;
    }

    &:focus {
        outline: none;
    }

    .pi-hashtag {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 900;
    }
}

.custom-tag:hover .pi-hashtag {
    color: rgba(255, 255, 255, 0.8);
}

.article-card-content-text {
    color: var(--text-primary);
    font-size: 20px;
    font-family: var(--font-sans);
    font-weight: 500;
    margin-top: 30px;
    flex: 1;
    overflow: hidden;
    position: relative;
    display: block;
    line-height: 1.5;
    max-height: 240px; /* Добавили ещё ~30px для ещё одной строки */
    
    /* Настоящее размытие текста */
    &::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        color: var(--text-primary);
        font-size: 20px;
        font-family: var(--font-sans);
        font-weight: 500;
        line-height: 1.5;
        pointer-events: none;
        
        /* Настоящее blur размытие с маской */
        filter: blur(1.5px);
        mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 45%,
            rgba(0, 0, 0, 0.3) 60%,
            rgba(0, 0, 0, 0.8) 80%,
            rgba(0, 0, 0, 1) 100%
        );
        -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 45%,
            rgba(0, 0, 0, 0.3) 60%,
            rgba(0, 0, 0, 0.8) 80%,
            rgba(0, 0, 0, 1) 100%
        );
    }
    
    /* Оригинальный текст с fade-out маской для показа обрезанной строки */
    mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 70%,
        rgba(0, 0, 0, 0.8) 75%,
        rgba(0, 0, 0, 0.5) 80%,
        rgba(0, 0, 0, 0.3) 85%,
        rgba(0, 0, 0, 0.1) 92%,
        rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 70%,
        rgba(0, 0, 0, 0.8) 75%,
        rgba(0, 0, 0, 0.5) 80%,
        rgba(0, 0, 0, 0.3) 85%,
        rgba(0, 0, 0, 0.1) 92%,
        rgba(0, 0, 0, 0) 100%
    );
}


.read-more-btn {
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
    min-width: 140px;
    position: relative;
    z-index: 10; /* Поднимаем кнопку над тенями */

    &:hover {
        background-color: var(--btn-primary-hover, #2563eb);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
}

.article-card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: var(--bg-secondary);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.article-actions {
    display: flex;
    align-items: center;
}

.action-group {
    display: flex;
    align-items: center;
    gap: 10px; /* Увеличено с 8px (+25%) */
}

.action-btn {
    background: none;
    border: none;
    border-radius: 8px;
    padding: 12px 17px; /* Увеличено с 10px 14px (+20%) */
    display: flex;
    align-items: center;
    gap: 10px; /* Увеличено с 8px (+25%) */
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-secondary);
    font-size: 18px; /* Увеличено с 15px (+20%) */
    font-family: var(--font-sans);
    min-height: 48px; /* Увеличено с 40px (+20%) */

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
    }

    &:active {
        transform: scale(0.95);
    }

    i {
        font-size: 22px; /* Увеличено с 18px до 22px (+22%) */
        transition: all 0.2s ease;
    }

    .action-count {
        font-weight: 500;
        font-size: 18px; /* Увеличено с 15px (+20%) */
    }
}

.action-btn.like-btn {
    &:hover {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        
        .heart-icon {
            color: #ef4444;
            transform: scale(1.1);
        }
    }

    &.active {
        background-color: rgba(239, 68, 68, 0.15);
        color: #ef4444;

        .heart-icon {
            color: #ef4444;
            animation: heartPulse 0.3s ease-out;
        }
    }
}

.heart-icon {
    transition: all 0.3s ease;
    
    &.filled {
        color: #ef4444;
        transform: scale(1.05);
        filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.3));
    }
}

@keyframes heartPulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1.05);
    }
}

.action-btn.dislike-btn {
    &:hover {
        background-color: rgba(156, 163, 175, 0.1);
        color: #9ca3af;
    }

    &.active {
        background-color: rgba(156, 163, 175, 0.15);
        color: #9ca3af;
    }
}

.action-btn.comment-btn {
    &:hover {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
    }
}

.action-btn.bookmark-btn {
    &:hover {
        background-color: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
    }

    &.active {
        background-color: rgba(245, 158, 11, 0.15);
        color: #f59e0b;

        i {
            color: #f59e0b;
        }
    }
}

.action-btn.share-btn {
    &:hover {
        background-color: rgba(34, 197, 94, 0.1);
        color: #22c55e;
    }
}
</style>