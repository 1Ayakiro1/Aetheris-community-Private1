<template>
  <div class="notifications-container">
    <h2 class="main-header">Your notifications</h2>
    
    <!-- Notifications list -->
    <div class="notifications-list">
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @mark-as-read="handleMarkAsRead"
      />
      
      <!-- Empty state -->
      <div v-if="notifications.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3 class="empty-title">Нет уведомлений</h3>
        <p class="empty-description">У вас пока нет новых уведомлений</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NotificationItem from '@/components/NotificationItem.vue'

interface Notification {
  id: string
  title: string
  description: string
  createdAt: string
  isRead: boolean
  avatar?: string
  actionText?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

// Sample notifications data with unique IDs
const notifications = reactive<Notification[]>([
  {
    id: 'notif_001',
    title: 'Новая статья опубликована',
    description: 'Пользователь @alexdev опубликовал новую статью "Введение в Vue.js 3". Статья получила много положительных отзывов от сообщества.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
    avatar: '/api/placeholder/48/48',
    actionText: 'Перейти к статье',
    type: 'info'
  },
  {
    id: 'notif_002',
    title: 'Комментарий к вашей статье',
    description: 'Пользователь @maria_code оставил комментарий к вашей статье "Основы TypeScript". Возможно, стоит ответить на вопрос.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: false,
    actionText: 'Посмотреть комментарий',
    type: 'info'
  },
  {
    id: 'notif_003',
    title: 'Ваша статья получила лайк',
    description: 'Пользователю @frontend_ninja понравилась ваша статья "Современные CSS техники". Всего лайков: 15.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    isRead: true,
    actionText: 'Посмотреть статью',
    type: 'success'
  },
  {
    id: 'notif_004',
    title: 'Системное уведомление',
    description: 'Запланированное техническое обслуживание сервера будет проведено завтра с 02:00 до 04:00 МСК. Возможны кратковременные перебои в работе.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
    type: 'warning'
  },
  {
    id: 'notif_005',
    title: 'Добро пожаловать!',
    description: 'Спасибо за регистрацию в нашем сообществе! Не забудьте заполнить свой профиль и опубликовать первую статью.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    isRead: true,
    actionText: 'Настроить профиль',
    type: 'success'
  }
])

const handleMarkAsRead = (notificationId: string) => {
  const notification = notifications.find(n => n.id === notificationId)
  if (notification) {
    notification.isRead = true
  }
}
</script>

<style scoped>
.notifications-container {
  max-width: 1920px;
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 40px 180px;
  align-items: center;
}

.main-header {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 32px;
}

.notifications-list {
  max-width: 800px;
}

/* Empty state styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 24px;
  color: var(--text-secondary);
  opacity: 0.6;
}

.empty-title {
  color: var(--text-primary);
  font-size: 24px;
  font-family: var(--font-primary);
  font-weight: 600;
  margin: 0 0 12px 0;
}

.empty-description {
  color: var(--text-secondary);
  font-size: 16px;
  font-family: var(--font-sans);
  margin: 0;
  max-width: 400px;
  line-height: 1.5;
}

/* Responsive scaling */
@media screen and (min-width: 2560px) {
  .notifications-container {
    padding: 52px 234px;
  }
  
  .main-header {
    font-size: 39px;
    margin-bottom: 42px;
  }
  
  .notifications-list {
    max-width: 1040px;
  }
  
  .empty-state {
    padding: 104px 26px;
  }
  
  .empty-icon {
    margin-bottom: 31px;
  }
  
  .empty-icon svg {
    width: 83px;
    height: 83px;
  }
  
  .empty-title {
    font-size: 31px;
    margin-bottom: 16px;
  }
  
  .empty-description {
    font-size: 21px;
    max-width: 520px;
  }
}

@media screen and (min-width: 3840px) {
  .notifications-container {
    padding: 64px 288px;
  }
  
  .main-header {
    font-size: 48px;
    margin-bottom: 51px;
  }
  
  .notifications-list {
    max-width: 1280px;
  }
  
  .empty-state {
    padding: 128px 32px;
  }
  
  .empty-icon {
    margin-bottom: 38px;
  }
  
  .empty-icon svg {
    width: 102px;
    height: 102px;
  }
  
  .empty-title {
    font-size: 38px;
    margin-bottom: 19px;
  }
  
  .empty-description {
    font-size: 26px;
    max-width: 640px;
  }
}

/* Mobile responsiveness */
@media screen and (max-width: 768px) {
  .notifications-container {
    padding: 20px;
  }
  
  .main-header {
    font-size: 24px;
    margin-bottom: 24px;
  }
  
  .notifications-list {
    max-width: 100%;
  }
  
  .empty-state {
    padding: 60px 20px;
  }
  
  .empty-icon svg {
    width: 48px;
    height: 48px;
  }
  
  .empty-title {
    font-size: 20px;
  }
  
  .empty-description {
    font-size: 14px;
  }
}
</style>