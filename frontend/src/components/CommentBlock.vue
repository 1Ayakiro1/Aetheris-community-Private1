<template>
  <div class="comment-block">
    <!-- User Info -->
    <div class="comment-header">
      <div class="user-avatar" @click="onUserClick">
        <img
          v-if="comment.author.avatar"
          :src="comment.author.avatar"
          :alt="comment.author.username"
          class="avatar-image"
        />
        <div v-else class="avatar-placeholder">
          <svg
            class="question-icon"
            width="18"
            height="18"
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

      <div class="user-info">
        <div class="user-name-row">
          <h3 class="username" @click="onUserClick">{{ comment.author.username }}</h3>
          <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
        </div>
      </div>
    </div>

    <!-- Comment Content -->
    <div class="comment-content">
      <p class="comment-text">{{ comment.text }}</p>
    </div>

    <!-- Comment Actions -->
    <div class="comment-actions">
      <button class="action-btn reply-btn" @click="onReply">
        <svg class="reply-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 14L4 9L9 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="action-text">Ответить</span>
      </button>
      
      <div class="rating-system">
        <div 
          class="dropdown-icon1"
          @mouseenter="upArrowHover = true"
          @mouseleave="upArrowHover = false"
        >
          <DropdownIcon :color="upArrowHover ? '#22c55e' : '#9BA4AE'" /> <!-- Здесь изменение цвета при ховере-->
        </div>
        <p class="rating-text">0</p> <!-- Здесь вставишь свои значени из бэкенда -->
        <div 
          class="dropdown-icon2"
          @mouseenter="downArrowHover = true"
          @mouseleave="downArrowHover = false"
        >
          <DropdownIcon :color="downArrowHover ? '#ef4444' : '#9BA4AE'" /> <!-- Тут тоже цвет меняется-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DropdownIcon from '@/assets/icons/DropdownIcon.vue'

interface CommentAuthor {
  id: number
  username: string
  avatar?: string
}

interface Comment {
  id: number
  author: CommentAuthor
  text: string
  createdAt: string | Date
  likes?: number
  userLiked?: boolean
}

interface CommentBlockProps {
  comment: Comment
}

interface CommentBlockEmits {
  (e: 'like', commentId: number): void
  (e: 'reply', commentId: number): void
  (e: 'userClick', userId: number): void
}

const props = defineProps<CommentBlockProps>()
const emit = defineEmits<CommentBlockEmits>()

const isLiked = ref(props.comment.userLiked || false)
const likesCount = ref(props.comment.likes || 0)
const upArrowHover = ref(false)
const downArrowHover = ref(false)

const onLike = () => {
  isLiked.value = !isLiked.value
  likesCount.value += isLiked.value ? 1 : -1
  emit('like', props.comment.id)
}

const onReply = () => {
  emit('reply', props.comment.id)
}

const onUserClick = () => {
  emit('userClick', props.comment.author.id)
}

const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return 'только что'
  if (diffInMinutes < 60) return `${diffInMinutes} мин назад`
  if (diffInHours < 24) return `${diffInHours} ч назад`
  if (diffInDays === 1) return 'вчера'
  if (diffInDays < 7) return `${diffInDays} дн назад`
  
  return dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.dropdown-icon1 {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  margin-left: 16px;
  transform: rotate(180deg);
  cursor: pointer;

  :deep(svg path) {
    transition: stroke 0.5s ease-in-out;
  }

  &:hover {
    transform: rotate(180deg);
  }
}

.dropdown-icon2 {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}

.comment-block {
  background-color: var(--bg-secondary);
  border-radius: 20px;
  padding: 20px 24px;
  margin-bottom: 16px;
  width: 70%;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.comment-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--btn-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  
  &:hover {
    transform: scale(1.05);
  }
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.question-icon {
  color: var(--text-primary);
}

.user-info {
  flex: 1;
  margin-top: 11px;
  min-width: 0;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.username {
  color: var(--text-primary);
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: 600;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--btn-primary);
  }
}

.comment-time {
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-sans);
  font-weight: 400;
}

.comment-content {
  margin-bottom: 12px;
  padding-left: 60px;
}

.comment-text {
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 60px;
}

.action-btn {
  background: none;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-sans);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.action-btn.like-btn {
  &:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    
    .heart-icon {
      color: #ef4444;
    }
  }
  
  &.active {
    background-color: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    
    .heart-icon {
      color: #ef4444;
    }
  }
}

.heart-icon {
  transition: all 0.3s ease;
  
  &.filled {
    color: #ef4444;
    transform: scale(1.05);
  }
}

.action-btn.reply-btn {
  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    
    .reply-icon {
      color: #3b82f6;
    }
  }
}

.reply-icon {
  transition: all 0.3s ease;
}

.action-count,
.action-text {
  font-weight: 500;
  font-size: 14px;
}

/* Rating System */
.rating-system {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  margin-left: auto;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
    transform: scale(1.1);
  }
  
  &:first-child {
    transform: rotate(180deg);
    
    &:hover {
      transform: rotate(180deg) scale(1.1);
    }
  }
}

.rating-text {
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: 600;
  margin: 0;
  min-width: 24px;
  text-align: center;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .comment-block {
    padding: 16px 18px;
    border-radius: 16px;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
  }
  
  .username {
    font-size: 16px;
  }
  
  .comment-time {
    font-size: 12px;
  }
  
  .comment-content {
    padding-left: 52px;
  }
  
  .comment-text {
    font-size: 14px;
  }
  
  .comment-actions {
    padding-left: 52px;
  }
  
  .action-btn {
    padding: 6px 10px;
    font-size: 13px;
  }
}

/* Планшеты */
@media (min-width: 769px) and (max-width: 1024px) {
  .comment-block {
    padding: 18px 20px;
  }
  
  .username {
    font-size: 17px;
  }
  
  .comment-text {
    font-size: 15px;
  }
}
</style>

