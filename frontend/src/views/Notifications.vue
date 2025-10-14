<template>
  <div class="notifications-container">
    <div class="notifications-header">
      <h2 class="main-header">Your notifications</h2>
      <div v-if="hasUnread" class="header-actions">
        <button @click="markAllAsRead" class="mark-all-btn">
          Отметить все как прочитанные
        </button>
      </div>
    </div>
    
    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Загрузка уведомлений...</p>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchNotifications" class="retry-btn">Попробовать снова</button>
    </div>
    
    <!-- Notifications list -->
    <div v-else class="notifications-list">
      <!-- Unread notifications -->
      <div v-if="unreadNotifications.length > 0" class="notifications-section">
        <h3 class="section-title">Непрочитанные ({{ unreadNotifications.length }})</h3>
        <NotificationItem
          v-for="notification in unreadNotifications"
          :key="notification.id"
          :notification="notification"
          @mark-as-read="handleMarkAsRead"
          @navigate="handleNavigate"
        />
      </div>
      
      <!-- Read notifications -->
      <div v-if="readNotifications.length > 0" class="notifications-section">
        <h3 class="section-title">Прочитанные ({{ readNotifications.length }})</h3>
        <NotificationItem
          v-for="notification in readNotifications"
          :key="notification.id"
          :notification="notification"
          @mark-as-read="handleMarkAsRead"
          @navigate="handleNavigate"
        />
      </div>
      
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
import { onMounted } from 'vue'
import NotificationItem from '@/components/NotificationItem.vue'
import { useNotifications } from '@/composables/useNotifications'

const {
  notifications,
  unreadNotifications,
  readNotifications,
  hasUnread,
  loading,
  error,
  fetchNotifications,
  markAsRead,
  markAsReadOnNavigate,
  markAllAsRead
} = useNotifications()

const handleMarkAsRead = async (notificationId: number) => {
  await markAsRead(notificationId)
}

const handleNavigate = async (notificationId: number) => {
  // Автоматически отмечаем уведомление как прочитанное при переходе
  await markAsReadOnNavigate(notificationId)
}

onMounted(() => {
  fetchNotifications()
})
</script>

<style scoped>
.notifications-container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 24px;
  
  /* Планшеты */
  @media (max-width: 1024px) {
    max-width: 1000px;
    padding: 20px;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 16px;
  }
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--text-secondary);
}

.main-header {
  color: var(--text-primary);
  font-size: 24px;
  font-family: var(--font-comfortaa);
  font-weight: 600;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.mark-all-btn {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--text-secondary);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mark-all-btn:hover {
  background-color: var(--text-secondary);
  color: var(--bg-primary);
}

.notifications-list {
  max-width: 100%;
}

.notifications-section {
  margin-bottom: 24px;
}

.section-title {
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-sans-serif);
  font-weight: 600;
  margin: 0 0 12px 0;
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--text-secondary);
  border-top: 2px solid var(--btn-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.error-state p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 12px;
}

.retry-btn {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--text-secondary);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background-color: var(--text-secondary);
  color: var(--bg-primary);
}

/* Empty state styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 16px;
  color: var(--text-secondary);
  opacity: 0.5;
}

.empty-icon svg {
  width: 48px;
  height: 48px;
}

.empty-title {
  color: var(--text-primary);
  font-size: 18px;
  font-family: var(--font-sans-serif);
  font-weight: 600;
  margin: 0 0 8px 0;
}

.empty-description {
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-sans-serif);
  margin: 0;
  max-width: 300px;
  line-height: 1.4;
}

/* Mobile responsiveness */
@media screen and (max-width: 768px) {
  .notifications-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .main-header {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 14px;
  }
}
</style>