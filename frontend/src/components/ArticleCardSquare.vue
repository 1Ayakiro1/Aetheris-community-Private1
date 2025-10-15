<template>
  <div class="article-card-square" @click.stop="emit('articleClick', article.id)">
    <div class="thumb">
      <img v-if="article.previewImage" :src="article.previewImage" :alt="article.title" />
      <div v-else class="thumb-fallback">{{ article.title.charAt(0).toUpperCase() }}</div>
    </div>
    <div class="info">
      <h4 class="title" :title="article.title">{{ article.title }}</h4>
      <div class="meta">
        <span class="author" @click.stop="emit('authorClick', article.author.id)">{{ article.author.username }}</span>
        <span class="dot">•</span>
        <span class="time">{{ shortDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '@/types/article'

const props = defineProps<{ article: Article }>()
const emit = defineEmits(['authorClick','articleClick'])

const shortDate = computed(() => {
  const d = new Date(props.article.createdAt as any)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})
</script>

<style scoped>
.article-card-square { 
  background: var(--bg-secondary); 
  border-radius: 16px; 
  overflow: hidden; 
  display: flex; 
  flex-direction: column; 
  cursor: pointer; 
  transition: box-shadow 0.2s ease, transform 0.1s ease; 
}
.article-card-square:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
.thumb { width: 100%; aspect-ratio: 1 / 1; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb-fallback { color: var(--text-secondary); font-weight: 700; font-family: var(--font-sans); font-size: 28px; }
.info { padding: 10px 12px 12px 12px; display: flex; flex-direction: column; gap: 6px; }
.title { color: var(--text-primary); font-size: 15px; font-family: var(--font-sans); font-weight: 700; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 34px; }
.meta { color: var(--text-secondary); font-size: 12px; font-family: var(--font-sans); font-weight: 600; display: flex; gap: 6px; align-items: center; }
.author { color: var(--text-primary); }
.author:hover { text-decoration: underline; }
.dot { opacity: 0.6; }
</style>


