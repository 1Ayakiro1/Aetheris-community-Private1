<template>
  <div class="article-card-line" @click="handleCardClick">
    <div class="thumbnail">
      <img v-if="article.previewImage" :src="article.previewImage" :alt="article.title" />
      <div v-else class="thumb-fallback">{{ article.title.charAt(0).toUpperCase() }}</div>
    </div>
    <div class="content">
      <div class="header">
        <div class="avatar" @click.stop="emit('authorClick', article.author.id)">
          <img v-if="article.author.avatar" :src="article.author.avatar" :alt="article.author.username" />
          <div v-else class="avatar-fallback">{{ article.author.username.charAt(0).toUpperCase() }}</div>
        </div>
        <div class="author-block" @click.stop="emit('authorClick', article.author.id)">
          <div class="author">{{ article.author.username }}</div>
          <div class="time">{{ formatDate(article.createdAt) }}</div>
        </div>
      </div>
      <div class="title-row">
        <h3 class="title">{{ article.title }}</h3>
        <span v-if="article.status === 'draft'" class="badge">Draft</span>
      </div>
      <p class="excerpt">{{ shortText }}</p>
      <div class="tags">
        <Tag v-for="tag in (article.tags || []).slice(0,4)" :key="tag" :value="tag" class="tag" @click.stop="emit('tagClick', tag)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import Tag from 'primevue/tag'
import { useAuthStore } from '@/stores/auth'
import type { Article } from '@/types/article'

const props = defineProps<{ article: Article }>()
const emit = defineEmits(['tagClick','authorClick','articleClick'])

const router = useRouter()
const toast = useToast()
const { t } = useI18n()
const authStore = useAuthStore()

const shortText = computed(() => {
  const text = props.article.excerpt || props.article.content || ''
  const plain = (text || '').replace(/<[^>]*>/g, '')
  return plain.length > 160 ? plain.slice(0, 160) + '…' : plain
})

function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

const handleCardClick = () => {
  // Проверяем авторизацию
  if (!authStore.isAuthenticated) {
    // Показываем уведомление о необходимости авторизации
    toast.add({
      severity: 'warn',
      summary: t('notifications.authRequired.summary'),
      detail: t('notifications.authRequired.detail'),
      life: 4000
    })
    
    // Перенаправляем на страницу авторизации
    router.push('/login')
    return
  }
  
  // Эмитим событие для перехода к статье
  emit('articleClick', props.article.id)
}
</script>

<style scoped>
.article-card-line {
  display: flex;
  background-color: var(--bg-secondary);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.1s ease;
}
.article-card-line:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
.thumbnail { width: 220px; height: 160px; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.thumbnail img { width: 100%; height: 100%; object-fit: cover; }
.thumb-fallback { color: var(--text-secondary); font-weight: 700; font-family: var(--font-sans); font-size: 28px; }
.content { display: flex; flex-direction: column; padding: 12px 14px; gap: 8px; min-width: 0; }
.header { display: flex; align-items: center; gap: 10px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; overflow: hidden; background: var(--btn-primary); flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar-fallback { color: var(--text-primary); font-weight: 700; font-family: var(--font-sans); }
.author-block { display: flex; flex-direction: column; }
.author { color: var(--text-primary); font-size: 16px; font-family: var(--font-sans); font-weight: 700; }
.time { color: var(--text-secondary); font-size: 14px; font-family: var(--font-sans); font-weight: 600; }
.title-row { display: flex; align-items: center; gap: 8px; }
.title { color: var(--text-primary); font-size: 20px; font-family: var(--font-sans); font-weight: 700; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.badge { background: rgba(245,158,11,0.2); color: #f59e0b; border: 1px solid rgba(245,158,11,0.6); padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.excerpt { color: var(--text-secondary); font-size: 14px; font-family: var(--font-sans); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tags { display: flex; gap: 6px; margin-top: 2px; }
::deep(.tag) { font-size: 12px !important; padding: 4px 8px !important; border-radius: 10px !important; }

@media (max-width: 768px) {
  .thumbnail { width: 140px; height: 100px; }
  .title { font-size: 18px; }
}
</style>


