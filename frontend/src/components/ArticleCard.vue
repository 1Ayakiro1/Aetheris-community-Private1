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
        <div class="tags-container">
            <button 
              v-for="(tag, index) in article.tags" 
              :key="index"
              class="tag"
              :class="{ 
                'tag-hovered': hoveredTags.includes(index),
                'tag-leaving': leavingTags.includes(index)
              }"
              @click="onTagClick(tag)"
              @mouseenter="onTagHover(index)"
              @mouseleave="onTagLeave(index)"
            >
              <span>{{ tag }}</span>
            </button>
        </div>
        <div class="article-card-content-text">
            {{ article.excerpt || article.content }}
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Article, ArticleCardProps, ArticleCardEmits } from '../types/article'

// Пропсы компонента
const props = defineProps<ArticleCardProps>()

// Эмиты для событий
const emit = defineEmits<ArticleCardEmits>()

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

// Состояние для отслеживания наведенных тегов
const hoveredTags = ref<number[]>([])
const leavingTags = ref<number[]>([])

const onTagHover = (index: number) => {
  if (!hoveredTags.value.includes(index)) {
    hoveredTags.value.push(index)
  }
  // Убираем из списка уходящих
  leavingTags.value = leavingTags.value.filter(i => i !== index)
}

const onTagLeave = (index: number) => {
  // Убираем из наведенных сразу
  hoveredTags.value = hoveredTags.value.filter(i => i !== index)
  
  // Добавляем в список уходящих
  leavingTags.value.push(index)
  
  // Убираем из уходящих через время анимации, но оставляем кубик в правой позиции
  setTimeout(() => {
    leavingTags.value = leavingTags.value.filter(i => i !== index)
    // Кубик остается в правой позиции (left: 100%)
  }, 400)
}


</script>

<style scoped>
.article-card {
    width: 1055px;
    height: 600px;
    background-color: var(--bg-secondary);
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

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
}

.article-card-content-title {
    color: var(--text-primary);
    font-size: 25px;
    font-family: var(--font-sans);
    font-weight: 700;
}

.tags-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
}

.tag {
    position: relative;
    border: 2px solid #FFFFFF;
    background-color: transparent;
    width: 160px;
    height: 40px;
    border-radius: 10px;
    font-size: 20px;
    font-family: var(--font-sans);
    font-weight: 700;
    color: var(--text-primary);
    cursor: pointer;
    overflow: hidden;

 /* ЗДЕСЬ ЭТА КРАСИВАЯ АНИМАЦИЯ ХОВЕРА ЮХУУУУУ Я СДЕЛАЛ ЕЕ */

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        z-index: -1;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: -1;
    }

    span {
        position: relative;
        z-index: 2;
        transition: color 0.3s ease;
    }

    &.tag-hovered {
        color: #000000;
        
        &::before {
            left: 0;
            transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    }

    &.tag-leaving {
        color: var(--text-primary);
        
        &::before {
            left: 100%;
            transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        &::after {
            opacity: 1;
        }
    }



    /* Click */
    &:active {
        &::before {
            background-color: var(--btn-primary);
        }
        color: var(--text-primary);
    }

    &:focus {
        outline: none;
        border: 2px solid var(--btn-primary);
    }

    &:disabled {
        background-color: var(--btn-primary);
        color: var(--text-primary);
        cursor: not-allowed;
        
        &::before {
            display: none;
        }
    }
}

.article-card-content-text {
    color: var(--text-primary);
    font-size: 20px;
    font-family: var(--font-sans);
    font-weight: 500;
    margin-top: 30px;
}
</style>