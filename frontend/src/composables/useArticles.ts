import { ref } from 'vue'
import type { Article, CreateArticleRequest } from '@/types/article'
import { useAuthStore } from '@/stores/auth'
import {
    getAllArticles,
    getArticle as apiGetArticle,
    reactArticle as apiReact,
    createArticle as apiCreateArticle,
    updateArticle as apiUpdateArticle,
    getArticleComments,
    createArticleComment,
    reactComment as apiReactComment,
} from '@/api/articles'

const articles = ref<Article[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

function generateExcerpt(content: string, length = 1400): string {
    if (!content) return ''
    const clean = content.replace(/<[^>]+>/g, '')
    return clean.length > length ? clean.slice(0, length).trimEnd() : clean
}

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
    const article: Article = {
        id: a.id,
        title: a.title,
        content: a.content,
        excerpt: a.excerpt || generateExcerpt(a.content),
        author: {
            id: Number(a.author?.id) || 0,
            username: a.author?.username || (typeof a.author === 'string' ? a.author : `User ${a.author}`)
        },
        tags: Array.isArray(a.tags)
            ? a.tags
            : (typeof a.tags === 'string' ? a.tags.split(',') : []),
        createdAt: a.created_at || a.createdAt,
        status: a.status || 'published',
        likes: a.likes ?? 0,
        dislikes: a.dislikes ?? 0,
        commentsCount: a.comments_count ?? a.commentsCount ?? 0,
        userReaction: a.user_reaction ?? null,
        previewImage: a.preview_image || a.previewImage || null, // <- важно!
    }
    return article
}

export function useArticles() {
    const auth = useAuthStore()
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
            if (idx !== -1) articles.value[idx] = mapped
            return mapped
        } catch (e: any) {
            console.error('Ошибка при реакции', e)
            throw e
        }
    }

    async function getArticle(articleId: number) {
        try {
            const userId = getOrCreateUserId()
            const raw = await apiGetArticle(articleId, userId)
            return mapServerArticle(raw)
        } catch (e: any) {
            console.error('Ошибка при загрузке статьи', e)
            throw e
        }
    }

    async function createArticle(data: CreateArticleRequest) {
        try {
            loading.value = true
            error.value = null
            const payload = {
                ...data,
                author: auth.user?.username || data.author || 'Anonymous'
            } as any
            const rawArticle = await apiCreateArticle(payload)
            console.log('API вернул article:', rawArticle)

            const article = mapServerArticle(rawArticle)
            articles.value.unshift(article)
            console.log('rawArticle из API:', article)

            return article
        } catch (e: any) {
            error.value = e.message || 'Ошибка API при создании статьи'
            console.error(error.value)
            throw new Error(String(error.value))
        } finally {
            loading.value = false
        }
    }

    async function updateArticle(id: number, data: CreateArticleRequest) {
        try {
            loading.value = true
            error.value = null
            const rawArticle = await apiUpdateArticle(id, data)
            const article = mapServerArticle(rawArticle)
            const idx = articles.value.findIndex(a => a.id === id)
            if (idx !== -1) articles.value[idx] = article
            return article
        } catch (e: any) {
            error.value = e.message || 'Ошибка API при обновлении статьи'
            console.error(error.value)
            throw new Error(String(error.value))
        } finally {
            loading.value = false
        }
    }

    // comments
    async function fetchComments(articleId: number) {
        const userId = getOrCreateUserId()
        return await getArticleComments(articleId, userId)
    }

    async function addComment(articleId: number, text: string, parentId?: number | null) {
        const authorId = auth.user?.id ?? getOrCreateUserId()
        const author_name = auth.user?.username || 'Guest'
        return await createArticleComment(articleId, { text, parent_id: parentId ?? null, author_id: authorId, author_name })
    }

    async function reactCommentFn(commentId: number, reaction: 'like' | 'dislike') {
        const userId = getOrCreateUserId()
        return await apiReactComment(commentId, userId, reaction)
    }

    return { articles, loading, error, fetchArticles, react, getArticle, createArticle, updateArticle, fetchComments, addComment, reactCommentFn }
}
