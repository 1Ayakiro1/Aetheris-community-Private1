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
    difficulty?: string
}

// Type for articles from user profile API (uses snake_case)
export interface UserArticle {
    id: number
    title: string
    content: string
    excerpt?: string
    author: string  // Backend stores author as string (username)
    tags: string[]
    created_at: string  // Backend uses snake_case
    status: 'draft' | 'published' | 'archived'
    likes?: number
    dislikes?: number
    comments_count?: number  // Backend uses snake_case
    user_reaction?: 'like' | 'dislike' | null  // Backend uses snake_case
    preview_image?: string  // Backend uses snake_case
    difficulty?: string
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
    preview_image?: string | null;
    difficulty?: string;
    author?: string;
}
