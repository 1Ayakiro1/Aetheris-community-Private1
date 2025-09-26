import { ref } from 'vue'
import type { Article } from '@/types/article'
import { getAllArticles, reactArticle as apiReact } from '@/api/articles'

const articles = ref<Article[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

function getOrCreateUserId(): number {
    const key = 'anon_user_id'
    let id = localStorage.getItem(key)
    if (!id) {
        id = String(Date.now() + Math.floor(Math.random() * 10000))
        localStorage.setItem(key, id)
    }
    return Number(id)
}

function mapServerArticle(a: any): Article {
    return {
        id: a.id,
        title: a.title,
        content: a.content,
        excerpt: a.excerpt,
        author: {
            id: Number(a.author) || 0,
            username: typeof a.author === 'string' ? a.author : `User ${a.author}`
        },
        tags: a.tags || (Array.isArray(a.tags) ? a.tags : []),
        createdAt: a.created_at || a.createdAt,
        status: a.status || 'published',
        likes: a.likes,
        dislikes: a.dislikes,
        commentsCount: a.comments_count ?? a.commentsCount,
        userReaction: a.user_reaction ?? null
    } as unknown as Article
}

export function useArticles() {
    async function fetchArticles() {
        loading.value = true
        error.value = null
        try {
            const userId = getOrCreateUserId()
            const raw = await getAllArticles(userId)
            articles.value = raw.map(mapServerArticle)
        } catch (e: any) {
            error.value = e.message || 'Ошибка загрузки'
        } finally {
            loading.value = false
        }
    }

    async function react(articleId: number, reaction: 'like' | 'dislike') {
        try {
            const userId = getOrCreateUserId()
            const updated = await apiReact(articleId, userId, reaction)
            const mapped = mapServerArticle(updated)
            const idx = articles.value.findIndex(a => a.id === articleId)
            if (idx !== -1) {
                articles.value[idx] = mapped
            }
            return mapped
        } catch (e: any) {
            console.error('Ошибка при реакции', e)
            throw e
        }
    }

    return { articles, loading, error, fetchArticles, react }
}
