import apiClient from './axios'
import type { Article } from "@/types/article"

export async function getAllArticles(): Promise<Article[]> {
    const res = await apiClient.get<Article[]>("/articles/")
    return res.data
}

export async function createArticle(
    data: Omit<Article, "id" | "createdAt">
): Promise<Article> {
    const res = await apiClient.post<Article>("/articles/", data)
    return res.data
}

export const likeArticle = async (articleId: number) => {
    return apiClient.post(`/articles/${articleId}/like`)
}

export const dislikeArticle = async (articleId: number) => {
    return apiClient.post(`/articles/${articleId}/dislike`)
}
