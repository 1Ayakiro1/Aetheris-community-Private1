<template>
    <div class="profile-container">
        <!-- Profile Header Section -->
        <div class="profile-header">
            <!-- Avatar -->
            <div class="profile-avatar"></div>

            <!-- User Info -->
            <div class="user-info">
                <h1 class="user-nickname">
                    {{ auth.user?.username || "Гость" }}
                </h1>

                <p class="user-tag">
                    {{ auth.user ? "#" + auth.user.id : "#0000" }}
                </p>

                <!-- User Stats -->
                <div class="user-stats" v-if="auth.isAuthenticated && userStats">
                    <span class="stat-item">{{ userStats.articles_count }} {{ $t('profile_page.title1') }}</span>
                    <div class="stat-divider"></div>
                    <span class="stat-item">{{ userStats.comments_count }} {{ $t('profile_page.title2') }}</span>
                    <div class="stat-divider"></div>
                    <span class="stat-item">{{ $t('profile_page.title3') }} {{ formattedJoinDate }}</span>
                    <div class="stat-divider"></div>
                    <span class="stat-item">{{ $t('profile_page.title4') }}</span>
                </div>
                <div class="user-stats" v-else-if="auth.isAuthenticated && loading">
                    <span class="stat-item">Загрузка...</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons" v-if="auth.isAuthenticated">
                <button class="edit-button">
                    <img src="/src/assets/imgs/pen.png" alt="Edit" class="edit-icon" width="30" height="30">
                    <span class="edit-text">{{ $t('profile_page.button1') }}</span>
                </button>

                <button class="more-button">
                    <svg class="more-icon" width="6" height="30" viewBox="0 0 6 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="6" r="2" fill="currentColor"/>
                        <circle cx="3" cy="15" r="2" fill="currentColor"/>
                        <circle cx="3" cy="24" r="2" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Divider Line -->
        <div class="profile-divider"></div>

        <!-- Content Section -->
        <div class="profile-content">
            <div v-if="!auth.isAuthenticated" class="empty-state">
                <p class="empty-message">
                    {{ $t('common.not_registered') }}
                </p>
            </div>
            <div v-else-if="loading" class="loading-state">
                <p class="loading-message">Загрузка статей...</p>
            </div>
            <div v-else-if="error" class="error-state">
                <p class="error-message">{{ error }}</p>
                <button @click="refreshProfile" class="retry-button">Попробовать снова</button>
            </div>
            <div v-else-if="articles.length === 0" class="empty-state">
                <p class="empty-message">
                    {{ $t('common.no_articles') }}
                </p>
            </div>
            <div v-else class="articles-grid">
                <ArticleCard
                    v-for="article in articles"
                    :key="article.id"
                    :article="article"
                    @tag-click="handleTagClick"
                    @author-click="handleAuthorClick"
                    @article-click="handleArticleClick"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth"
import { useI18n } from 'vue-i18n'
import { useProfile } from '@/composables/useProfile'
import ArticleCard from '@/components/ArticleCard.vue'
import type { Article, UserArticle } from '@/types/article'

const auth = useAuthStore()
const router = useRouter()
const { t } = useI18n()
const { 
    userStats, 
    userArticles, 
    loading, 
    error, 
    formattedJoinDate, 
    refreshProfile 
} = useProfile()

// Преобразуем UserArticle в Article для совместимости с ArticleCard
const articles = computed<Article[]>(() => {
    return userArticles.value.map((userArticle: UserArticle): Article => ({
        id: userArticle.id,
        title: userArticle.title,
        content: userArticle.content,
        excerpt: userArticle.excerpt,
        author: {
            id: 0, // У нас нет ID автора в UserArticle
            username: userArticle.author,
            avatar: undefined
        },
        tags: userArticle.tags,
        createdAt: userArticle.created_at,
        status: userArticle.status,
        likes: userArticle.likes,
        dislikes: userArticle.dislikes,
        commentsCount: userArticle.comments_count,
        userReaction: userArticle.user_reaction,
        previewImage: userArticle.preview_image,
        difficulty: userArticle.difficulty
    }))
})

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Обработчики событий ArticleCard
const handleTagClick = (tag: string) => {
    console.log('Клик по тегу:', tag)
    // TODO: Реализовать фильтрацию по тегу
}

const handleAuthorClick = (authorId: number) => {
    console.log('Клик по автору:', authorId)
    // TODO: Реализовать фильтрацию по автору
}

const handleArticleClick = (articleId: number) => {
    console.log('Клик по статье:', articleId)
    // Переход к полной статье
    router.push(`/article/${articleId}`)
}

onMounted(async () => {
    if (!auth.user && auth.token) {
        try { 
            await auth.fetchMe() 
        } catch {}
    }
    
    if (auth.isAuthenticated) {
        await refreshProfile()
    }
})
</script>


<style scoped>
.profile-container {
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 0 16px;
  box-sizing: border-box;

  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 0 12px;
  }

  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 20px;
    max-width: 1000px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    padding: 0 24px;
    max-width: 1400px;
  }
}

/* Profile Header */
.profile-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 40px;
  width: 1365px;
}

/* Avatar */
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--btn-primary);
  flex-shrink: 0;
}

/* User Info */
.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  flex: 1;
}

.user-nickname {
  font-family: var(--font-sans);
  font-size: 30px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.user-tag {
  font-family: var(--font-sans);
  font-size: 23px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0 0 20px 0;
}

/* User Stats */
.user-stats {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.stat-item {
  font-family: var(--font-sans);
  font-size: 25px;
  font-weight: 500;
  color: var(--text-third);
}

.stat-divider {
  width: 3px;
  height: 48px;
  background-color: var(--btn-primary);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
}

.edit-button {
  display: flex;
  align-items: center;
  width: 150px;
  height: 56px;
  background-color: var(--btn-primary);
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0 16px;
}

.edit-button:hover {
  opacity: 0.9;
}

.edit-icon {
  width: 30px;
  height: 30px;
  color: var(--text-primary);
}

.edit-text {
  font-family: var(--font-sans);
  font-size: 25px;
  font-weight: 500;
  color: var(--text-primary);
  margin-left: 16px;
}

.more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: var(--btn-primary);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.more-button:hover {
  opacity: 0.9;
}

.more-icon {
  width: 6px;
  height: 30px;
  color: var(--text-primary);
}

/* Profile Divider */
.profile-divider {
  height: 2px;
  width: 1360px;
  background-color: var(--btn-primary);
  margin-top: 20px;
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 200px 0 210px 0;
}

.empty-message {
  font-family: var(--font-sans);
  font-size: 25px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

.loading-message, .error-message {
  font-family: var(--font-sans);
  font-size: 25px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0 0 20px 0;
}

.retry-button {
  background-color: var(--btn-primary);
  color: var(--text-primary);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.retry-button:hover {
  opacity: 0.9;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
}

.empty-state, .loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200px 0 210px 0;
}

/* Мобильные устройства */
@media (max-width: 768px) {
  .articles-grid {
    gap: 16px;
    padding: 16px 0;
  }
}
</style>
