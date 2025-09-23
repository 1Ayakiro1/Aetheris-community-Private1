// useArticles.ts
import { ref } from 'vue'
import api from '@/api/axios'
import type { Article } from '@/types/article'

export function useArticles() {
    const articles = ref<Article[]>([])
    const loading = ref(false)

    const fetchArticles = async () => {
        loading.value = true
        try {
            const response = await api.get('/articles')
            const rawArticles = response.data

            articles.value = rawArticles.map((a: any) => ({
                id: a.id,
                title: a.title,
                content: a.content,
                excerpt: a.excerpt,
                author: {
                    id: Number(a.author), //в объект
                    username: `User ${a.author}`,//пока временно просто так
                    avatar: null
                },
                tags: a.tags,
                createdAt: a.created_at,
                status: a.status,
                likes: a.likes,
                dislikes: a.dislikes,
                commentsCount: a.comments_count
            }))
        } catch (err) {
            console.error('Ошибка при загрузке статей', err)
        } finally {
            loading.value = false
        }
    }

    return { articles, loading, fetchArticles }
}
