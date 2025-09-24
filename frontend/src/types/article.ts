// types/article.ts

export interface Author {
    id: number
    username: string
}

export interface Article {
    id: number
    title: string
    content: string
    excerpt?: string
    // author: Author
    author: {
        id: number
        username: string
    }
    tags: string[]
    createdAt: string
    status: 'draft' | 'published' | 'archived'
    likes?: number
    dislikes?: number
    commentsCount?: number
}

// Пропсы для компонента ArticleCard
export interface ArticleCardProps {
    article: Article
}

// Эмиты компонента ArticleCard
export interface ArticleCardEmits {
    tagClick: [tag: string]
    authorClick: [authorId: number]
    articleClick: [articleId: number]
}

// Тип ответа с сервера
export interface ArticlesResponse {
    articles: Article[]
    total: number
}
