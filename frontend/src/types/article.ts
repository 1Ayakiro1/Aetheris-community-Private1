export interface Author {
    id: number
    username: string
}

export interface Article {
    id: number
    title: string
    content: string
    excerpt?: string
    author: {
        id: number
        username: string
        avatar?: string
    }
    tags: string[]
    createdAt: string
    status: 'draft' | 'published' | 'archived'
    likes?: number
    dislikes?: number
    commentsCount?: number
    userReaction?: 'like' | 'dislike' | null
    previewImage?: string
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

export interface CreateArticleRequest {
    title: string;
    content: string;
    excerpt?: string;
    tags: string[];
    status: string;
    previewImage?: string;  // добавил
}
