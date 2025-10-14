<template>
  <div class="admin-section">
    <h2>Reported articles</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="!items.length" class="empty">No reports</div>
    <div v-else class="stack">
      <div class="article-wrapper" v-for="item in items" :key="item.id">
        <ArticleCard :article="toArticle(item)" />
        <div class="reason">
          <div class="reason-label">Report reason</div>
          <div class="reason-text">{{ item.reportReason }}</div>
          <div class="actions">
            <button class="btn">Hide</button>
            <button class="btn danger" @click="openDelete(item)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <AdminDeleteDialog v-if="showDelete" v-model="showDelete" @confirm="confirmDelete" @cancel="cancelDelete" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchReportedArticles } from '@/api/articles'
import ArticleCard from '@/components/ArticleCard.vue'
import AdminDeleteDialog from '@/components/AdminDeleteDialog.vue'
import type { Article } from '@/types/article'

interface ReportedArticleItem {
  id: number
  title: string
  reportReason: string
}

const items = ref<ReportedArticleItem[]>([])
const loading = ref<boolean>(true)
const showDelete = ref<boolean>(false)
const pendingDeleteId = ref<number | null>(null)

onMounted(async () => {
  try {
    const data = await fetchReportedArticles()
    items.value = data
  } finally {
    loading.value = false
  }
})

function toArticle(item: ReportedArticleItem): Article {
  return {
    id: item.id,
    title: item.title,
    content: '',
    excerpt: item.title,
    author: { id: 0, username: 'Reported' },
    tags: [],
    createdAt: new Date().toISOString(),
    status: 'published',
    likes: 0,
    dislikes: 0,
    commentsCount: 0,
  }
}

function openDelete(item: ReportedArticleItem) {
  pendingDeleteId.value = item.id
  showDelete.value = true
}

function confirmDelete(reason: string) {
  if (pendingDeleteId.value != null) {
    items.value = items.value.filter(i => i.id !== pendingDeleteId.value)
  }
  pendingDeleteId.value = null
  try {
    document.dispatchEvent(new CustomEvent('app-toast', { detail: {
      severity: 'success',
      summary: 'Article deleted',
      detail: reason ? `Reason: ${reason}` : 'Deleted successfully',
      life: 3500
    } }))
  } catch {}
}

function cancelDelete() {
  pendingDeleteId.value = null
}
</script>

<style lang="scss" scoped>
.admin-section { display: flex; flex-direction: column; gap: 16px; width: 100%; }
.stack { display: flex; flex-direction: column; gap: 24px; align-items: center; width: 100%; }
.article-wrapper { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.reason { width: 100%; max-width: 1055px; background: var(--bg-secondary); border-radius: 20px; padding: 20px; font-family: var(--font-sans); min-height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.reason-label { font-size: 16px; opacity: 0.7; margin-bottom: 8px; font-family: var(--font-sans); }
.reason-text { font-size: 22px; text-align: center; margin-bottom: 16px; }
.actions { display: flex; gap: 12px; }
.btn { padding: 12px 20px; border-radius: 12px; border: 1px solid var(--text-secondary); background: transparent; color: var(--text-primary); font-weight: 700; cursor: pointer; font-size: 16px; transition: background-color .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease, transform .15s ease; }
.btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.18); }
.btn:active { transform: translateY(0) scale(0.98); box-shadow: 0 3px 10px rgba(0,0,0,0.16); }
.btn:focus-visible { outline: 2px solid var(--btn-primary); outline-offset: 2px; }
.btn.primary { background: var(--btn-primary); }
.btn.danger { border-color: #ef4444; color: #ef4444; }
.loading, .empty { opacity: 0.8; }
</style>


