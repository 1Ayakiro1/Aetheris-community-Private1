<template>
  <div class="admin-section">
    <div class="section-header">
      <h2>Reported profiles</h2>
      <span class="badge" v-if="items.length">{{ items.length }}</span>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="!items.length" class="empty">No reports</div>
    <div v-else class="stack">
      <div class="profile-wrapper" v-for="item in items" :key="item.id">
        <AdminProfileCard :profile="{ id: item.id, nickname: item.nickname }" />
        <div class="reason">
          <div class="reason-chip">Reason</div>
          <div class="reason-text">{{ item.reportReason }}</div>
          <div class="actions">
            <button class="btn subtle">Hide</button>
            <button class="btn danger" @click="openDelete(item)">Ban</button>
          </div>
        </div>
      </div>
    </div>
    <AdminDeleteDialog v-if="showDelete" v-model="showDelete" @confirm="confirmDelete" @cancel="cancelDelete" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchReportedProfiles } from '@/api/articles'
import AdminProfileCard from '@/components/AdminProfileCard.vue'
import AdminDeleteDialog from '@/components/AdminDeleteDialog.vue'

interface ReportedProfileItem {
  id: number
  nickname: string
  reportReason: string
}

const items = ref<ReportedProfileItem[]>([])
const loading = ref<boolean>(true)
const showDelete = ref<boolean>(false)
const pendingDeleteId = ref<number | null>(null)

onMounted(async () => {
  try {
    const data = await fetchReportedProfiles()
    items.value = data
  } finally {
    loading.value = false
  }
})

function openDelete(item: ReportedProfileItem) {
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
      summary: 'User banned',
      detail: reason ? `Reason: ${reason}` : 'Banned successfully',
      life: 3500
    } }))
  } catch {}
}

function cancelDelete() {
  pendingDeleteId.value = null
}
</script>

<style lang="scss" scoped>
.admin-section { display: flex; flex-direction: column; gap: 20px; width: 100%; font-family: var(--font-sans); }
.section-header { display: flex; align-items: center; gap: 10px; }
.section-header h2 { margin: 0; font-size: 22px; }
.badge { background: var(--btn-primary); color: var(--text-primary); border: 1px solid var(--text-secondary); border-radius: 10px; padding: 4px 8px; font-weight: 700; font-size: 12px; }

.stack { display: flex; flex-direction: column; gap: 24px; align-items: flex-start; width: 100%; }
.profile-wrapper { width: 100%; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
:deep(.profile-card) { width: 100%; max-width: 1055px; height: 130px; }
.reason { width: 100%; max-width: 1055px; background: var(--bg-secondary); border-radius: 20px; padding: 20px; font-family: var(--font-sans); min-height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.reason-chip { display: inline-flex; align-items: center; padding: 6px 12px; font-size: 16px; font-weight: 700; color: var(--text-primary); border: none; border-radius: 8px; background: transparent; margin-bottom: 12px; }
.reason-text { font-size: 22px; opacity: 0.9; text-align: center; margin-bottom: 16px; }
.actions { display: flex; gap: 12px; }
.btn { padding: 12px 20px; border-radius: 12px; border: 1px solid var(--text-secondary); background: transparent; color: var(--text-primary); font-weight: 700; cursor: pointer; font-size: 16px; transition: background-color .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease, transform .15s ease; }
.btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,0.18); }
.btn:active { transform: translateY(0) scale(0.98); box-shadow: 0 3px 10px rgba(0,0,0,0.16); }
.btn:focus-visible { outline: 2px solid var(--btn-primary); outline-offset: 2px; }
.btn.primary { background: var(--btn-primary); }
.btn.subtle { background: rgba(255,255,255,0.04); }
.btn.danger { border-color: #ef4444; color: #ef4444; }
.loading, .empty { opacity: 0.8; }
</style>


