import { ref, computed } from 'vue'
import { getUserStats, getUserArticles, type UserStats } from '@/api/articles'
import type { UserArticle } from '@/types/article'

export function useProfile() {
    const userStats = ref<UserStats | null>(null)
    const userArticles = ref<UserArticle[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const formattedJoinDate = computed(() => {
        if (!userStats.value?.join_date) return 'Неизвестно'
        const date = new Date(userStats.value.join_date)
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    })

    const fetchUserStats = async () => {
        try {
            loading.value = true
            error.value = null
            userStats.value = await getUserStats()
        } catch (err) {
            error.value = 'Ошибка загрузки статистики'
            console.error('Error fetching user stats:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchUserArticles = async (skip: number = 0, limit: number = 100) => {
        try {
            loading.value = true
            error.value = null
            userArticles.value = await getUserArticles(skip, limit)
        } catch (err) {
            error.value = 'Ошибка загрузки статей'
            console.error('Error fetching user articles:', err)
        } finally {
            loading.value = false
        }
    }

    const refreshProfile = async () => {
        await Promise.all([
            fetchUserStats(),
            fetchUserArticles()
        ])
    }

    return {
        userStats,
        userArticles,
        loading,
        error,
        formattedJoinDate,
        fetchUserStats,
        fetchUserArticles,
        refreshProfile
    }
}
