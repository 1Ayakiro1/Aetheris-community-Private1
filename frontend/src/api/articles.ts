import apiClient from './axios'
import type { Article } from '@/types/article'

export async function getAllArticles(userId?: number): Promise<Article[]> {
    const res = await apiClient.get<Article[]>('/articles/', {
        params: userId ? { user_id: userId } : {}
    })
    return res.data
}

export async function createArticle(
    data: Omit<Article, 'id' | 'createdAt'>
): Promise<Article> {
    const res = await apiClient.post<Article>('/articles/', data)
    return res.data
}

export const reactArticle = async (articleId: number, userId: number, reaction: 'like' | 'dislike') => {
    const res = await apiClient.post(`/articles/${articleId}/react`, { user_id: userId, reaction })
    return res.data as Article
}
