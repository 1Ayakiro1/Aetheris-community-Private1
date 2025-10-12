import apiClient from './axios'
import type { Article, CreateArticleRequest } from '@/types/article'

export async function getAllArticles(userId?: number): Promise<Article[]> {
    const res = await apiClient.get<Article[]>('/articles/', {
        params: userId ? { user_id: userId } : {}
    })
    return res.data
}

export async function getArticle(id: number, userId?: number): Promise<Article> {
    const res = await apiClient.get<Article>(`/articles/${id}`, {
        params: userId ? { user_id: userId } : {}
    })
    return res.data
}

export async function reactArticle(
    articleId: number,
    userId: number,
    reaction: 'like' | 'dislike'
): Promise<Article> {
    const res = await apiClient.post(`/articles/${articleId}/react`, {
        user_id: userId,
        reaction
    })
    return res.data as Article
}

export async function createArticle(data: CreateArticleRequest): Promise<Article> {
    const res = await apiClient.post<Article>('/articles/', data)
    return res.data
}

export async function updateArticle(id: number, data: CreateArticleRequest): Promise<Article> {
    const res = await apiClient.put<Article>(`/articles/${id}`, data)
    return res.data
}
