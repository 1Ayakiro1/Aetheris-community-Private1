<template>
  <div class="draft-page">
    <div class="container">
      <h1 class="title">Drafts</h1>
      <div v-if="loading" class="loading">Loading…</div>
      <div v-else-if="drafts.length === 0" class="empty">No drafts yet</div>
      <div v-else class="list">
        <DraftArticleCard
          v-for="a in drafts"
          :key="a.id"
          :article="a"
          @edit="editDraft"
          @delete="deleteDraft"
          @open="openDraft"
        />
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DraftArticleCard from '@/components/DraftArticleCard.vue'
import type { Article } from '@/types/article'
import { useArticles } from '@/composables/useArticles'

const { fetchArticles, articles, loading } = useArticles()
const drafts = computed<Article[]>(() => articles.value.filter(a => a.status === 'draft'))

onMounted(async () => {
  await fetchArticles()
})

function editDraft(id: number) {
  // navigate to editor later
  console.log('edit draft', id)
}

function deleteDraft(id: number) {
  console.log('delete draft', id)
}

function openDraft(id: number) {
  console.log('open draft', id)
}
</script>

<style scoped>
.draft-page { background: var(--bg-primary); min-height: 100vh; }
.container { width: 100%; max-width: 1060px; margin: 0 auto; padding: 24px; box-sizing: border-box; }
.title { color: var(--text-primary); font-family: var(--font-sans); font-size: 28px; font-weight: 700; margin: 16px 0 24px; }
.loading, .empty { color: var(--text-secondary); font-weight: 700; font-family: var(--font-sans); }
.list { display: flex; flex-direction: column; gap: 16px; }
</style>
