<template>
  <div class="full-article-card">
    <!-- Header -->
    <div class="article-card-header">
        <div class="logo" @click.stop="onAuthorClick">
          <img
            v-if="article.author.avatar"
            :src="article.author.avatar"
            :alt="article.author.username"
            class="avatar-image"
          />
          <div v-else class="avatar-placeholder">
            <svg
              class="question-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 17H12.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="nickname-container" @click.stop="onAuthorClick">
            <h2 class="nickname">{{ article.author.username }}</h2>
            <h2 class="publication-time">{{ formatDate(article.createdAt) }}</h2>
        </div>
    </div>
    <!-- Content -->
    <div class="article-card-content">
        <h1 class="article-card-content-title">{{ article.title }}</h1>

        <!-- Metadata Panel -->
        <div class="metadata-panel">
            <div class="metadata-item difficulty" :class="`difficulty-${article.difficulty || 'medium'}`">
                <svg class="metadata-icon" width="16" height="16" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2230 5098 c-58 -40 -70 -65 -86 -189 -46 -351 -187 -668 -418 -931
                    -90 -104 -165 -169 -352 -308 -498 -373 -786 -889 -835 -1498 -40 -491 129
                    -1027 448 -1422 86 -106 251 -264 363 -347 409 -302 905 -441 1401 -393 535
                    52 1019 309 1367 725 333 398 504 928 463 1433 -38 476 -207 872 -523 1224
                    -97 107 -127 128 -189 128 -70 0 -102 -28 -179 -156 -63 -106 -176 -259 -217
                    -296 -19 -17 -19 -16 -10 60 13 111 2 368 -22 502 -72 411 -254 775 -536 1068
                    -124 129 -212 204 -341 290 -197 131 -268 155 -334 110z m321 -474 c251 -209
                    445 -504 543 -826 56 -186 70 -288 70 -498 0 -209 -13 -298 -71 -493 -48 -161
                    -51 -193 -21 -236 60 -88 138 -100 235 -36 186 122 386 311 513 482 58 79 78
                    99 88 91 25 -22 154 -222 196 -307 242 -483 243 -1058 3 -1538 -141 -280 -336
                    -501 -595 -674 -373 -250 -846 -343 -1284 -255 -622 126 -1113 562 -1308 1162
                    -180 553 -76 1138 285 1599 91 116 231 247 391 366 151 112 311 261 407 379
                    171 212 322 504 382 740 9 36 21 82 26 103 l10 39 27 -18 c15 -9 61 -45 103
                    -80z"/>
                </svg>
                <span class="metadata-text">{{ getDifficultyText(article.difficulty) }}</span>
            </div>
            <div class="metadata-item time">
                <i class="pi pi-clock metadata-icon"></i>
                <span class="metadata-text">22 min</span>
            </div>
            <div class="metadata-item views">
                <i class="pi pi-eye metadata-icon"></i>
                <span class="metadata-text">3</span>
            </div>
        </div>

        <div class="tags-container">
            <Tag
              v-for="tag in article.tags"
              :key="tag"
              :value="tag"
              :severity="getTagSeverity(tag)"
              class="custom-tag"
              @click.stop="onTagClick(tag)"
            />
        </div>

        <!-- Preview Block -->
        <div class="article-card-preview">
            <div 
                class="preview-image" 
                v-if="article.previewImage"
                :style="{ '--preview-bg': `url(${article.previewImage})` }"
            >
                <img :src="article.previewImage" :alt="article.title" class="preview-img" />
            </div>
            <div class="preview-content" v-else>
                <div class="preview-placeholder">
                    <i class="pi pi-image preview-icon"></i>
                    <span class="preview-text">Превью статьи</span>
                </div>
            </div>
        </div>

        <!-- Full Article Content (без размытия) -->
        <div class="article-card-content-text full-content" v-html="article.content">
        </div>
    </div>

    <!-- Footer block with icons -->
    <div class="article-card-footer">
        <div class="article-actions">
            <div class="action-group">
                <button class="action-btn like-btn" @click.stop="onLike" :class="{ 'active': isLiked }">
                    <svg class="heart-icon" :class="{ 'filled': isLiked }" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              :fill="isLiked ? 'currentColor' : 'none'"
                        />
                    </svg>
                    <span class="action-count">{{ likesCount }}</span>
                </button>

                <button class="action-btn dislike-btn" @click.stop="onDislike" :class="{ 'active': isDisliked }">
                    <svg class="dislike-icon" :class="{ 'filled': isDisliked }" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              :fill="isDisliked ? 'currentColor' : 'none'"
                        />
                    </svg>
                    <span class="action-count">{{ dislikesCount }}</span>
                </button>

                <button class="action-btn comment-btn" @click.stop="onComment" :class="{ 'active': isCommentsOpen }">
                    <svg class="comment-icon" :class="{ 'filled': isCommentsOpen }" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              :fill="isCommentsOpen ? 'currentColor' : 'none'"
                        />
                    </svg>
                    <span class="action-count">{{ commentsCount }}</span>
                </button>

                <button class="action-btn bookmark-btn" @click.stop="onBookmark" :class="{ 'active': isBookmarked }">
                    <svg class="bookmark-icon" :class="{ 'filled': isBookmarked }" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              :fill="isBookmarked ? 'currentColor' : 'none'"
                        />
                    </svg>
                </button>

                <button class="action-btn share-btn" @click.stop="onShare" :class="{ 'active': isShared }">
                    <svg class="share-icon" :class="{ 'filled': isShared }" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2" :fill="isShared ? 'currentColor' : 'none'"/>
                        <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2" :fill="isShared ? 'currentColor' : 'none'"/>
                        <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2" :fill="isShared ? 'currentColor' : 'none'"/>
                        <path d="m8.59 13.51 6.83 3.98" stroke="currentColor" stroke-width="2"/>
                        <path d="m15.41 6.51-6.82 3.98" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Tag from 'primevue/tag'
import type { Article, ArticleCardProps, ArticleCardEmits } from '@/types/article'
import { useArticles } from '@/composables/useArticles'

// === props и emits ===
const props = defineProps<ArticleCardProps>()
const emit = defineEmits<ArticleCardEmits>()

// === composable ===
const { react } = useArticles()

// === состояния ===
const isLiked = ref(props.article.userReaction === 'like')
const isDisliked = ref(props.article.userReaction === 'dislike')
const likesCount = ref(props.article.likes || 0)
const dislikesCount = ref(props.article.dislikes || 0)
const isBookmarked = ref(false)
const isCommentsOpen = ref(false)
const isShared = ref(false)
const commentsCount = ref(props.article.commentsCount || 0)

// === watchers ===
watch(() => props.article.userReaction, (v) => {
    isLiked.value = v === 'like'
    isDisliked.value = v === 'dislike'
})
watch(() => props.article.likes, (v) => { likesCount.value = v ?? likesCount.value })
watch(() => props.article.dislikes, (v) => { dislikesCount.value = v ?? dislikesCount.value })

// === реакция (лайк/дизлайк) ===
const onLike = async () => {
    try {
        const updated = await react(props.article.id, 'like')
        likesCount.value = updated.likes ?? 0
        dislikesCount.value = updated.dislikes ?? 0
        isLiked.value = updated.userReaction === 'like'
        isDisliked.value = updated.userReaction === 'dislike'
    } catch (e) {
        console.error('Ошибка лайка:', e)
    }
}

const onDislike = async () => {
    try {
        const updated = await react(props.article.id, 'dislike')
        likesCount.value = updated.likes ?? 0
        dislikesCount.value = updated.dislikes ?? 0
        isLiked.value = updated.userReaction === 'like'
        isDisliked.value = updated.userReaction === 'dislike'
    } catch (e) {
        console.error('Ошибка дизлайка:', e)
    }
}

// === теги ===
const tagColors = ['success', 'info', 'warning', 'danger', 'secondary'] as const

// Группы тегов по цветам (синхронизировано с CreateArticle.vue)
const tagColorGroups: Record<'success' | 'info' | 'warning' | 'danger' | 'secondary', string[]> = {
  success: ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Web Development', 'Frontend', 'Tutorial', 'Guide'],
  info: ['Python', 'TypeScript', 'Angular', 'Programming', 'Backend', 'Database', 'SQL', 'API', 'REST'],
  warning: ['Design', 'UI/UX', 'Mobile Development', 'Game Development', 'Unity', 'Unreal Engine', 'Review', 'Interview'],
  danger: ['Security', 'Testing', 'Cryptography', 'DevOps', 'Docker', 'Kubernetes', 'Blockchain'],
  secondary: ['Tools', 'Git', 'NoSQL', 'Fullstack', 'Artificial Intelligence', 'Machine Learning', 'GraphQL', 'Microservices', 'Cloud', 'AWS', 'Azure', 'Google Cloud', 'Linux', 'Windows', 'macOS', 'News', 'Case Study', 'Architecture', 'Algorithms', 'Design Patterns']
}

const getTagSeverity = (tagOrIndex: string | number): typeof tagColors[number] => {
  if (typeof tagOrIndex === 'number') {
    return tagColors[tagOrIndex % tagColors.length]
  }
  
  const tag = tagOrIndex as string
  if (tagColorGroups.success.includes(tag)) return 'success'
  if (tagColorGroups.info.includes(tag)) return 'info'
  if (tagColorGroups.warning.includes(tag)) return 'warning'
  if (tagColorGroups.danger.includes(tag)) return 'danger'
  if (tagColorGroups.secondary.includes(tag)) return 'secondary'
  
  // Fallback
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % tagColors.length
  return tagColors[index]
}

// === прочее ===
const onShare = () => {}
const onTagClick = (tag: string) => {}
const onComment = () => {}
const onAuthorClick = () => {}
const onBookmark = () => {}

const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInMs = now.getTime() - dateObj.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Функция для получения текста сложности
const getDifficultyText = (difficulty: string | undefined): string => {
    switch (difficulty) {
        case 'easy':
            return 'Easy'
        case 'medium':
            return 'Medium'
        case 'hard':
            return 'Hard'
        default:
            return 'Medium'
    }
}
</script>

<style scoped>
.full-article-card {
    background-color: var(--bg-secondary);
    border-radius: 40px 40px 15px 15px;
    position: relative;
    min-height: auto;
    padding-bottom: 80px;
    margin: 0 auto;

    /* Мобильные устройства */
    @media (max-width: 768px) {
        width: 100%;
        border-radius: 25px 25px 10px 10px;
    }

    /* Планшеты */
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 100%;
        border-radius: 35px 35px 12px 12px;
    }

    /* Десктоп */
    @media (min-width: 1025px) {
        width: 1055px;
        border-radius: 40px 40px 15px 15px;
    }
}

.article-card-header {
    display: flex;
    height: 120px;
    width: 100%;
    flex-direction: row;
    align-items: center;
}

.logo {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background-color: #434956;
    border-radius: 100%;
    margin-left: 30px;
    margin-top: 55px;
    margin-bottom: 24px;
    margin-right: 24px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--btn-primary);
    color: var(--text-primary);
    font-size: 22px;
    font-weight: 700;
    font-family: var(--font-sans);
}

.question-icon {
    color: var(--text-primary);
    transition: all 0.2s ease-in-out;
}

.avatar-placeholder:hover .question-icon {
    color: #FFFFFF;
    transform: scale(1.1);
}

.nickname {
    color: var(--text-primary);
    font-size: 25px;
    font-family: var(--font-sans);
    font-weight: 700;
}

.nickname-container {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover .nickname {
        color: var(--btn-primary);
    }
}

.publication-time {
    color: var(--text-secondary);
    font-size: 20px;
    font-family: var(--font-sans);
    font-weight: 500;
}

.article-card-content {
    display: flex;
    margin-top: 0px;
    flex-direction: column;
    margin-left: 30px;
    margin-right: 30px;
    overflow: visible;
    position: relative;
}

.article-card-content-title {
    color: var(--text-primary);
    font-size: 32px;
    margin-top: 30px;
    font-family: var(--font-sans);
    font-weight: 700;
    line-height: 1.2;
}

.metadata-panel {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
}

.metadata-item {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}

.metadata-item.difficulty {
    padding: 8px 16px;
    border-radius: 40px;
    min-width: 60px;
    height: 32px;
    transition: all 0.3s ease;
}

/* Стили для разных уровней сложности */
.metadata-item.difficulty-easy {
    background-color: rgba(34, 197, 94, 0.2);
    
    .metadata-icon,
    .metadata-text {
        color: #22c55e;
    }
}

.metadata-item.difficulty-medium {
    background-color: rgba(245, 158, 11, 0.2);
    
    .metadata-icon,
    .metadata-text {
        color: #f59e0b;
    }
}

.metadata-item.difficulty-hard {
    background-color: rgba(239, 68, 68, 0.2);
    
    .metadata-icon,
    .metadata-text {
        color: #DC2626;
    }
}

.metadata-icon {
    font-size: 16px;
    color: #6B7280;
}

.metadata-text {
    font-size: 16px;
    font-family: var(--font-sans);
    font-weight: 500;
    color: #6B7280;
}

.tags-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
}

/* PrimeVue Tag стили */
:deep(.custom-tag) {
    padding: 10px 16px !important;
    font-size: 16px !important;
    font-family: var(--font-sans) !important;
    font-weight: bold !important;
    border-radius: 12px !important;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .p-tag-value {
        font-weight: bold !important;
    }
}

/* Preview Block Styles */
.article-card-preview {
    background-color: var(--bg-primary);
    border-radius: 15px;
    overflow: hidden;
    margin: 16px 0 20px 0;
    height: 400px;

    /* Мобильные устройства */
    @media (max-width: 768px) {
        height: 250px;
        margin: 12px 0 16px 0;
        border-radius: 12px;
    }

    /* Планшеты */
    @media (min-width: 769px) and (max-width: 1024px) {
        height: 300px;
        margin: 14px 0 18px 0;
        border-radius: 13px;
    }

    /* Десктоп */
    @media (min-width: 1025px) {
        height: 400px;
        margin: 16px 0 20px 0;
        border-radius: 15px;
    }
}

.preview-image {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    
    /* Размытый фон из того же изображения */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: var(--preview-bg);
        background-size: cover;
        background-position: center;
        filter: blur(20px);
        transform: scale(1.1);
        z-index: 1;
    }
}

.preview-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 2;
}

.preview-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0.6;
}

.preview-icon {
    font-size: 24px;
    color: var(--text-secondary);
}

.preview-text {
    font-size: 14px;
    color: var(--text-secondary);
    font-family: var(--font-sans);
}

/* Полный контент статьи без размытия */
.article-card-content-text.full-content {
    color: var(--text-primary);
    font-size: 20px;
    font-family: var(--font-sans);
    font-weight: 400;
    margin-top: 30px;
    margin-bottom: 40px;
    width: 100%;
    line-height: 1.6;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-line;
    
    /* Убираем все маски и размытия */
    mask-image: none;
    -webkit-mask-image: none;
    
    &::after {
        display: none;
    }
}

.article-card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: var(--bg-secondary);
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.article-actions {
    display: flex;
    align-items: center;
}

.action-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.action-btn {
    background: none;
    border: none;
    border-radius: 8px;
    padding: 12px 17px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-secondary);
    font-size: 18px;
    font-family: var(--font-sans);
    min-height: 48px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
    }

    &:active {
        transform: scale(0.95);
    }

    i {
        font-size: 22px;
        transition: all 0.2s ease;
    }

    .action-count {
        font-weight: 500;
        font-size: 18px;
    }
}

.action-btn.like-btn {
    &:hover {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;

        .heart-icon {
            color: #ef4444;
            transform: scale(1.1);
        }
    }

    &.active {
        background-color: rgba(239, 68, 68, 0.15);
        color: #ef4444;

        .heart-icon {
            color: #ef4444;
            animation: heartPulse 0.3s ease-out;
        }
    }
}

.heart-icon {
    transition: all 0.3s ease;

    &.filled {
        color: #ef4444;
        transform: scale(1.05);
        filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.3));
    }
}

@keyframes heartPulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1.05);
    }
}

.action-btn.dislike-btn {
    &:hover {
        background-color: rgba(156, 163, 175, 0.1);
        color: #9ca3af;

        .dislike-icon {
            color: #9ca3af;
            transform: scale(1.1);
        }
    }

    &.active {
        background-color: rgba(156, 163, 175, 0.15);
        color: #9ca3af;

        .dislike-icon {
            color: #9ca3af;
            animation: dislikePulse 0.3s ease-out;
        }
    }
}

.dislike-icon {
    transition: all 0.3s ease;

    &.filled {
        color: #9ca3af;
        transform: scale(1.05);
        filter: drop-shadow(0 0 4px rgba(156, 163, 175, 0.3));
    }
}

@keyframes dislikePulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1.05);
    }
}

.action-btn.comment-btn {
    &:hover {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;

        .comment-icon {
            color: #3b82f6;
            transform: scale(1.1);
        }
    }

    &.active {
        background-color: rgba(59, 130, 246, 0.15);
        color: #3b82f6;

        .comment-icon {
            color: #3b82f6;
            animation: commentPulse 0.3s ease-out;
        }
    }
}

.comment-icon {
    transition: all 0.3s ease;

    &.filled {
        color: #3b82f6;
        transform: scale(1.05);
        filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.3));
    }
}

@keyframes commentPulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1.05);
    }
}

.action-btn.bookmark-btn {
    &:hover {
        background-color: rgba(245, 158, 11, 0.1);
        color: #f59e0b;

        .bookmark-icon {
            color: #f59e0b;
            transform: scale(1.1);
        }
    }

    &.active {
        background-color: rgba(245, 158, 11, 0.15);
        color: #f59e0b;

        .bookmark-icon {
            color: #f59e0b;
            animation: bookmarkPulse 0.3s ease-out;
        }
    }
}

.bookmark-icon {
    transition: all 0.3s ease;

    &.filled {
        color: #f59e0b;
        transform: scale(1.05);
        filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.3));
    }
}

@keyframes bookmarkPulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1.05);
    }
}

.action-btn.share-btn {
    &:hover {
        background-color: rgba(34, 197, 94, 0.1);
        color: #22c55e;

        .share-icon {
            color: #22c55e;
            transform: scale(1.1);
        }
    }

    &.active {
        background-color: rgba(34, 197, 94, 0.15);
        color: #22c55e;

        .share-icon {
            color: #22c55e;
            animation: sharePulse 0.3s ease-out;
        }
    }
}

.share-icon {
    transition: all 0.3s ease;

    &.filled {
        color: #22c55e;
        transform: scale(1.05);
        filter: drop-shadow(0 0 4px rgba(34, 197, 94, 0.3));
    }
}

@keyframes sharePulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1.05);
    }
}
</style>

