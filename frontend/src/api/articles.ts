import apiClient from './axios'
import type { Article, CreateArticleRequest, UserArticle } from '@/types/article'

export interface CommentDTO {
    id: number
    article_id: number
    parent_id?: number | null
    author_id?: number | null
    author_name: string
    text: string
    created_at: string
    likes?: number
    dislikes?: number
    user_reaction?: string | null
}

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

// comments
export async function getArticleComments(articleId: number, userId?: number): Promise<CommentDTO[]> {
    const res = await apiClient.get<CommentDTO[]>(`/articles/${articleId}/comments`, {
        params: userId ? { user_id: userId } : {}
    })
    return res.data
}

export async function createArticleComment(articleId: number, payload: { text: string; parent_id?: number | null; author_id?: number | null; author_name?: string }): Promise<CommentDTO> {
    const res = await apiClient.post<CommentDTO>(`/articles/${articleId}/comments`, payload)
    return res.data
}

export async function reactComment(commentId: number, userId: number, reaction: 'like' | 'dislike'): Promise<CommentDTO> {
    const res = await apiClient.post<CommentDTO>(`/comments/${commentId}/react`, {
        user_id: userId,
        reaction
    })
    return res.data
}

// User stats and articles
export interface UserStats {
    articles_count: number
    comments_count: number
    join_date: string
}

export async function getUserStats(): Promise<UserStats> {
    const res = await apiClient.get<UserStats>('/auth/me/stats')
    return res.data
}

export async function getUserArticles(skip: number = 0, limit: number = 100): Promise<UserArticle[]> {
    const res = await apiClient.get<UserArticle[]>('/auth/me/articles', {
        params: { skip, limit }
    })
    return res.data
}
