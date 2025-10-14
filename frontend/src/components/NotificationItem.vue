<template>
  <div 
    class="notification-item" 
    :class="{ 'unread': !notification.is_read }"
    @click="handleClick"
  >
    <div class="notification-icon">
      <div class="icon-circle" :class="getIconClass()">
        <svg v-if="notification.type === 'comment_reply'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
               <svg v-else-if="notification.type === 'article_comment'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M14 2H6a2 2 0 0 0-2 2v16l4-4h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
               <svg v-else-if="notification.type === 'article_like_threshold'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
               <svg v-else-if="notification.type === 'daily_summary'" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M3 3h18v18H3zM21 9H3M21 15H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    
    <div class="notification-content">
      <div class="notification-header">
        <h3 class="notification-title">{{ notification.title }}</h3>
        <div v-if="!notification.is_read" class="unread-indicator"></div>
      </div>
      
      <p class="notification-message">{{ notification.message }}</p>
      
      <div class="notification-footer">
        <span class="notification-time">{{ formatTime(notification.created_at) }}</span>
        <button 
          v-if="!notification.is_read" 
          @click.stop="handleMarkAsRead"
          class="mark-read-btn"
        >
          Отметить как прочитанное
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { type Notification } from '@/api/notifications'

interface Props {
  notification: Notification
}

const props = defineProps<Props>()
const router = useRouter()

const emit = defineEmits<{
  markAsRead: [id: number]
  navigate: [id: number]
}>()

const handleClick = () => {
  console.log('Notification clicked:', props.notification)
  console.log('Related article ID:', props.notification.related_article_id)
  console.log('Related comment ID:', props.notification.related_comment_id)
  
  // Если есть связанная статья, переходим к ней
  if (props.notification.related_article_id) {
    const articlePath = `/article/${props.notification.related_article_id}`
    const fullPath = props.notification.related_comment_id 
      ? `${articlePath}#comment-${props.notification.related_comment_id}`
      : articlePath
    
    console.log('Navigating to:', fullPath)
    
    // Переходим к статье с якорем на комментарий, если есть
    router.push(fullPath)
    
    // Уведомляем родительский компонент о навигации
    emit('navigate', props.notification.id)
  } else {
    console.log('No related article ID found')
  }
}

const handleMarkAsRead = () => {
  emit('markAsRead', props.notification.id)
}

       const getIconClass = () => {
         switch (props.notification.type) {
           case 'comment_reply':
             return 'icon-reply'
           case 'article_comment':
             return 'icon-comment'
           case 'article_like_threshold':
             return 'icon-like'
           case 'daily_summary':
             return 'icon-summary'
           case 'weekly_summary':
             return 'icon-summary'
           default:
             return 'icon-default'
         }
       }

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) {
    return 'только что'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} мин назад`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} ч назад`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} дн назад`
  }
}
</script>

<style scoped>
.notification-item {
  display: flex;
  gap: 12px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 8px;
  padding: 12px;
  width: 100%;
  min-height: 70px;
}

.notification-item.unread {
  border-left: 3px solid var(--btn-primary);
  background-color: rgba(139, 92, 246, 0.03);
}

.notification-item:hover {
  border-color: var(--text-secondary);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.notification-icon {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.icon-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-reply {
  background-color: #3b82f6;
}

.icon-comment {
  background-color: #10b981;
}

       .icon-like {
         background-color: #ef4444;
       }

       .icon-summary {
         background-color: #f59e0b;
       }

       .icon-default {
         background-color: var(--btn-primary);
       }

.notification-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.notification-title {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
  font-family: var(--font-sans-serif);
}

.unread-indicator {
  width: 6px;
  height: 6px;
  background-color: var(--btn-primary);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 3px;
}

.notification-message {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
  word-wrap: break-word;
  font-family: var(--font-sans-serif);
}

.notification-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
}

.notification-time {
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 500;
  opacity: 0.8;
}

.mark-read-btn {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--text-secondary);
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mark-read-btn:hover {
  background-color: var(--text-secondary);
  color: var(--bg-primary);
}

/* Responsive design */
@media (max-width: 768px) {
  .notification-item {
    padding: 10px;
    min-height: 60px;
  }
  
  .icon-circle {
    width: 28px;
    height: 28px;
  }
  
  .notification-title {
    font-size: 13px;
  }
  
  .notification-message {
    font-size: 12px;
  }
  
  .notification-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>