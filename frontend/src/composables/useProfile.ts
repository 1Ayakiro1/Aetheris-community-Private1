import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { UserArticle } from '@/types/article'
import { getUserStats, getUserArticles } from '@/api/articles'

export function useProfile() {
    const auth = useAuthStore()

    const userStats = ref<{ articles_count: number; comments_count: number; join_date: string } | null>(null)
    const userArticles = ref<UserArticle[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const formattedJoinDate = computed(() => {
        if (!userStats.value?.join_date) return ''
        const date = new Date(userStats.value.join_date)
        return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
    })

    async function refreshProfile() {
        if (!auth.isAuthenticated) return
        loading.value = true
        error.value = null
        try {
            const [stats, articles] = await Promise.all([
                getUserStats(),
                getUserArticles(0, 100)
            ])
            userStats.value = stats
            userArticles.value = articles
        } catch (e: any) {
            error.value = e?.message || 'Не удалось загрузить профиль'
        } finally {
            loading.value = false
        }
    }

    return { userStats, userArticles, loading, error, formattedJoinDate, refreshProfile }
}


