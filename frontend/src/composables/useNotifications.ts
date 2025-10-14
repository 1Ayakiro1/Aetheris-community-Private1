import { ref, computed } from 'vue'
import { notificationsApi, type Notification } from '@/api/notifications'
import { useAuthStore } from '@/stores/auth'

export function useNotifications() {
  const auth = useAuthStore()
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Получить уведомления пользователя
  const fetchNotifications = async () => {
    if (!auth.isAuthenticated || !auth.user?.id) return

    loading.value = true
    error.value = null
    
    try {
      notifications.value = await notificationsApi.getUserNotifications(auth.user.id)
    } catch (err) {
      error.value = 'Ошибка при загрузке уведомлений'
      console.error('Error fetching notifications:', err)
    } finally {
      loading.value = false
    }
  }

  // Получить количество непрочитанных уведомлений
  const fetchUnreadCount = async () => {
    if (!auth.isAuthenticated || !auth.user?.id) return

    try {
      unreadCount.value = await notificationsApi.getUnreadCount(auth.user.id)
    } catch (err) {
      console.error('Error fetching unread count:', err)
    }
  }

  // Отметить уведомление как прочитанное
  const markAsRead = async (notificationId: number) => {
    if (!auth.isAuthenticated || !auth.user?.id) return

    try {
      const updatedNotification = await notificationsApi.markAsRead(notificationId, auth.user.id)
      
      // Обновляем локальное состояние
      const index = notifications.value.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        notifications.value[index] = updatedNotification
      }
      
      // Обновляем счетчик непрочитанных
      await fetchUnreadCount()
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  // Отметить уведомление как прочитанное при переходе к нему
  const markAsReadOnNavigate = async (notificationId: number) => {
    if (!auth.isAuthenticated || !auth.user?.id) return

    // Находим уведомление
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification && notification.is_read === 0) {
      await markAsRead(notificationId)
    }
  }

  // Отметить все уведомления как прочитанные
  const markAllAsRead = async () => {
    if (!auth.isAuthenticated || !auth.user?.id) return

    const unreadNotifications = notifications.value.filter(n => n.is_read === 0)
    
    try {
      await Promise.all(unreadNotifications.map(n => markAsRead(n.id)))
    } catch (err) {
      console.error('Error marking all notifications as read:', err)
    }
  }

  // Computed свойства
  const unreadNotifications = computed(() => 
    notifications.value.filter(n => n.is_read === 0)
  )

  const readNotifications = computed(() => 
    notifications.value.filter(n => n.is_read === 1)
  )

  const hasUnread = computed(() => unreadCount.value > 0)

  return {
    notifications,
    unreadCount,
    loading,
    error,
    unreadNotifications,
    readNotifications,
    hasUnread,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAsReadOnNavigate,
    markAllAsRead
  }
}
