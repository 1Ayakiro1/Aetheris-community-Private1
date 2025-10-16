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

export async function searchArticles(query: string, userId?: number, skip: number = 0, limit: number = 100): Promise<Article[]> {
    const res = await apiClient.get<Article[]>('/articles/search', {
        params: { 
            q: query,
            skip,
            limit,
            ...(userId ? { user_id: userId } : {})
        }
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

export async function updateArticle(id: number, userId: number, data: CreateArticleRequest): Promise<Article> {
    const res = await apiClient.put<Article>(`/articles/${id}`, data, {
        params: { user_id: userId }
    })
    return res.data
}

export async function deleteArticle(id: number, userId: number): Promise<void> {
    await apiClient.delete(`/articles/${id}`, {
        params: { user_id: userId }
    })
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

export async function getArticleForEdit(id: number): Promise<Article> {
    const res = await apiClient.get<Article>(`/articles/${id}`)
    return res.data
}

// Admin stubs: reported entities (to be replaced with real API)
export async function fetchReportedArticles(): Promise<Array<{ id: number; title: string; reportReason: string }>> {
    return [
        { id: 101, title: 'Formatting rules violation', reportReason: 'Spam/advertising in the text' },
        { id: 102, title: 'Toxic article', reportReason: 'Offensive language' },
    ]
}

export async function fetchReportedComments(): Promise<Array<{ id: number; content: string; reportReason: string }>> {
    return [
        { id: 201, content: "You don't understand anything!", reportReason: 'Toxic/abusive' },
        { id: 202, content: 'Visit my website ...', reportReason: 'Spam' },
    ]
}

export async function fetchReportedProfiles(): Promise<Array<{ id: number; nickname: string; reportReason: string }>> {
    return [
        { id: 301, nickname: 'bad_user123', reportReason: 'Suspicious activity' },
        { id: 302, nickname: 'spammer', reportReason: 'Mass link spamming' },
    ]
}
