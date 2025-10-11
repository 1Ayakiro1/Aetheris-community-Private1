<template>
  <div class="article-card" @click="onArticleClick">
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
        <h2 class="article-card-content-title">{{ article.title }}</h2>

        <!-- Metadata Panel -->
        <div class="metadata-panel">
            <div class="metadata-item difficulty">
                <i class="pi pi-chart-line metadata-icon"></i>
                <span class="metadata-text">complex</span>
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
              v-for="(tag, index) in article.tags"
              :key="index"
              :value="tag"
              class="custom-tag"
              @click="onTagClick(tag)"
            >
              <template #default>
                <i class="pi pi-hashtag" style="font-size: 12px; margin-right: 6px; font-weight: 900;"></i>
                <span>{{ tag }}</span>
              </template>
            </Tag>
        </div>

        <!-- Preview Block -->
        <div class="article-card-preview">
            <!-- Если превью есть и не сломалось -->
            <div class="preview-image" v-if="article.previewImage && !imageError">
                <img
                    :src="article.previewImage"
                    :alt="article.title"
                    class="preview-img"
                    @error="onImageError"
                />
            </div>

            <!-- Если ссылка есть, но изображение не загрузилось -->
            <div class="preview-fallback" v-else-if="imageError">
    <span class="preview-fallback-text">
      Изображение было удалено из-за плохого содержания
    </span>
            </div>

            <!-- Если вообще нет превью -->
            <div class="preview-content" v-else>
                <div class="preview-placeholder">
                    <i class="pi pi-image preview-icon"></i>
                    <span class="preview-text">Превью статьи</span>
                </div>
            </div>
        </div>


        <div class="article-card-content-text" :data-text="decodedArticleText">
            {{ decodedArticleText }}
        </div>
    </div>

    <!-- Footer block with icons and read more button -->
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

        <button class="read-more-btn" @click.stop="onArticleClick">
            Читать далее
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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
const imageError = ref(false)

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

// === прочее ===
const onShare = () => {}
const onTagClick = (tag: string) => {
  emit('tagClick', tag)
}
const onComment = () => {}
const onArticleClick = () => {
  emit('articleClick', props.article.id)
}
const onAuthorClick = () => {
  emit('authorClick', props.article.author.id)
}
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

function onImageError() {
    imageError.value = true
}

// Функция для декодирования HTML-сущностей
const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.value
}

// Computed свойство для декодированного текста статьи
const decodedArticleText = computed(() => {
    const text = props.article.excerpt || props.article.content
    return text ? decodeHtmlEntities(text) : ''
})
</script>
<style scoped>
.article-card {
    background-color: var(--bg-secondary);
    border-radius: 70px 70px 15px 15px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
    display: flex;
    flex-direction: column;
    /* Убираем ограничения высоты */
    max-height: none;
    height: auto;

    /* Мобильные устройства */
    @media (max-width: 768px) {
        width: 100%;
        min-height: 500px; /* Оптимальная минимальная высота для мобильных */
        border-radius: 25px 25px 10px 45px;
    }

    /* Планшеты */
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 100%;
        min-height: 650px; /* Оптимальная минимальная высота для планшетов */
        border-radius: 35px 35px 12px 12px;
    }

    /* Десктоп */
    @media (min-width: 1025px) {
        width: 1055px;
        min-height: 800px; /* Оптимальная минимальная высота для десктопа */
        border-radius: 60px 60px 15px 15px;
    }

    &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
    width: 80px; /* Уменьшено с 85px на 30% */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px; /* Уменьшено с 85px на 30% */
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
    font-size: 22px; /* Уменьшено с 32px на 30% */
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
    padding-bottom: 65px;
    overflow: visible;
    position: relative;
    flex: 1;
    min-height: 0;
    /* Убираем все ограничения для текста */
    max-height: none;
    height: auto;
}

.article-card-content-title {
    color: var(--text-primary);
    font-size: 25px;
    margin-top: 30px;
    font-family: var(--font-sans);
    font-weight: 700;
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
    background-color: rgba(239, 68, 68, 0.2);
    min-width: 60px;
    height: 32px;
    transition: all 0.3s ease;
}

.metadata-item.difficulty .metadata-icon,
.metadata-item.difficulty .metadata-text {
    color: #DC2626;
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
}

.custom-tag {
    background-color: rgba(255, 255, 255, 0.2) !important;
    min-width: 60px;
    height: 28px !important;
    padding: 0 12px !important;
    border-radius: 7px !important;
    font-size: 14px !important;
    font-family: var(--font-sans) !important;
    font-weight: 420 !important;
    color: rgba(255, 255, 255, 0.6) !important;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    letter-spacing: 1px;
    text-transform: lowercase;
    border: none !important;
    margin-right: 10px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.4) !important;
    }

    &:focus {
        outline: none;
    }

    .pi-hashtag {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 900;
    }
}

.custom-tag:hover .pi-hashtag {
    color: rgba(255, 255, 255, 0.8);
}

.article-card-content-text {
    color: var(--text-primary);
    font-size: 20px;
    font-family: var(--font-sans);
    font-weight: 500;
    margin-top: 30px;
    flex: 1;
    overflow: hidden;
    position: relative;
    display: -webkit-box;
    line-height: 1.5;
    min-height: 200px;
    max-height: 300px;
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal !important;
    /* Ограничиваем текст с плавным затуханием */
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}


.read-more-btn {
    background-color: var(--btn-primary);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-family: var(--font-sans);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 140px;
    position: relative;
    z-index: 10; /* Поднимаем кнопку над тенями */

    &:hover {
        background-color: var(--btn-primary-hover, #2563eb);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
}

.article-card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: var(--bg-secondary);
    border-bottom-left-radius: 40px; /* Исправил для соответствия основному блоку */
    border-bottom-right-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    gap: 10px; /* Увеличено с 8px (+25%) */
}

.action-btn {
    background: none;
    border: none;
    border-radius: 8px;
    padding: 12px 17px; /* Увеличено с 10px 14px (+20%) */
    display: flex;
    align-items: center;
    gap: 10px; /* Увеличено с 8px (+25%) */
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-secondary);
    font-size: 18px; /* Увеличено с 15px (+20%) */
    font-family: var(--font-sans);
    min-height: 48px; /* Увеличено с 40px (+20%) */

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
    }

    &:active {
        transform: scale(0.95);
    }

    i {
        font-size: 22px; /* Увеличено с 18px до 22px (+22%) */
        transition: all 0.2s ease;
    }

    .action-count {
        font-weight: 500;
        font-size: 18px; /* Увеличено с 15px (+20%) */
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

/* Preview Block Styles */
.article-card-preview {
    background-color: var(--bg-primary);
    border-radius: 15px;
    overflow: hidden;
    margin: 16px 0 20px 0; /* Убираем боковые отступы, так как уже внутри content */

    /* Мобильные устройства */
    @media (max-width: 768px) {
        height: 200px; /* Увеличено с 120px до 200px */
        margin: 12px 0 16px 0;
        border-radius: 12px;
    }

    /* Планшеты */
    @media (min-width: 769px) and (max-width: 1024px) {
        height: 240px; /* Увеличено с 140px до 240px */
        margin: 14px 0 18px 0;
        border-radius: 13px;
    }

    /* Десктоп */
    @media (min-width: 1025px) {
        height: 400px; /* Увеличено с 160px до 280px (альбомный формат) */
        margin: 16px 0 20px 0;
        border-radius: 15px;
    }
}

.preview-image {
    width: 100%;
    height: 100%;
}

.preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
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

    /* Мобильные устройства */
    @media (max-width: 768px) {
        font-size: 20px;
    }

    /* Планшеты */
    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 22px;
    }

    /* Десктоп */
    @media (min-width: 1025px) {
        font-size: 24px;
    }
}

.preview-text {
    font-size: 14px;
    color: var(--text-secondary);
    font-family: var(--font-sans);

    /* Мобильные устройства */
    @media (max-width: 768px) {
        font-size: 12px;
    }

    /* Планшеты */
    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 13px;
    }

    /* Десктоп */
    @media (min-width: 1025px) {
        font-size: 14px;
    }

    /* фолбек если ошибка загрузки изображения*/
    .preview-fallback {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-secondary, rgba(255, 255, 255, 0.05));
        text-align: center;
        padding: 20px;
    }

    .preview-fallback-text {
        font-size: 16px;
        color: var(--text-secondary);
        opacity: 0.8;
        line-height: 1.4;
        font-family: var(--font-sans);
        padding: 0 12px;
    }
}
</style>
