import axios from './axios'

export interface Notification {
  id: number
  user_id: number
  type: string
  title: string
  message: string
  is_read: number
  related_article_id?: number
  related_comment_id?: number
  created_at: string
}

export interface UnreadCountResponse {
  unread_count: number
}

// Настройки уведомлений удалены - используем фиксированные пороги

export const notificationsApi = {
  // Получить уведомления пользователя
  getUserNotifications: async (userId: number, skip: number = 0, limit: number = 100): Promise<Notification[]> => {
    const response = await axios.get(`/notifications/`, {
      params: { user_id: userId, skip, limit }
    })
    return response.data
  },

  // Отметить уведомление как прочитанное
  markAsRead: async (notificationId: number, userId: number): Promise<Notification> => {
    const response = await axios.post(`/notifications/${notificationId}/read`, null, {
      params: { user_id: userId }
    })
    return response.data
  },

  // Получить количество непрочитанных уведомлений
  getUnreadCount: async (userId: number): Promise<number> => {
    const response = await axios.get(`/notifications/unread-count`, {
      params: { user_id: userId }
    })
    return response.data.unread_count
  },

  // Функции настроек уведомлений удалены - используем фиксированные пороги
}
