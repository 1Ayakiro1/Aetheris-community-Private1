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

export interface ArticleCardProps {
    article: Article
}

export interface ArticleCardEmits {
    tagClick: [tag: string]
    authorClick: [authorId: number]
    articleClick: [articleId: number]
}

export interface ArticlesResponse {
    articles: Article[]
    total: number
}
