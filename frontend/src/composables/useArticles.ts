import { ref } from 'vue'
import type { Article } from '@/types/article'
import { getAllArticles, likeArticle, dislikeArticle } from '@/api/articles'

export function useArticles() {
    const articles = ref<Article[]>([])
    const loading = ref(false)

    const fetchArticles = async () => {
        loading.value = true
        try {
            const rawArticles = await getAllArticles()
            articles.value = rawArticles.map((a: any) => ({
                id: a.id,
                title: a.title,
                content: a.content,
                excerpt: a.excerpt,
                author: {
                    id: Number(a.author),
                    username: `User ${a.author}`,
                    avatar: null,
                },
                tags: a.tags,
                createdAt: a.created_at,
                status: a.status,
                likes: a.likes,
                dislikes: a.dislikes,
                commentsCount: a.comments_count,
            }))
        } catch (err) {
            console.error('Ошибка при загрузке статей', err)
        } finally {
            loading.value = false
        }
    }

    const like = async (id: number) => {
        try {
            const updated = await likeArticle(id)
            //Пока обновление локально надо будет пинью подрубмить
            const idx = articles.value.findIndex(a => a.id === id)
            if (idx !== -1) {
                articles.value[idx] = { ...articles.value[idx], ...updated }
            }
        } catch (err) {
            console.error('Ошибка при лайке', err)
        }
    }

    const dislike = async (id: number) => {
        try {
            const updated = await dislikeArticle(id)
            const idx = articles.value.findIndex(a => a.id === id)
            if (idx !== -1) {
                articles.value[idx] = { ...articles.value[idx], ...updated }
            }
        } catch (err) {
            console.error('Ошибка при дизлайке', err)
        }
    }

    return { articles, loading, fetchArticles, like, dislike }
}
