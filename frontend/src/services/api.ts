import axios from 'axios'
import type { Article } from '@/types/article'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
})

export async function getAllArticles(): Promise<Article[]> {
    const res = await api.get<Article[]>('/articles/')
    return res.data
}
