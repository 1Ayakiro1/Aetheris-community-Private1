<template>
  <div class="profile-card">
    <div class="avatar" @click="onUserClick">
      <img v-if="profile.avatar" :src="profile.avatar" alt="avatar" />
      <div v-else class="avatar-fallback">{{ initials }}</div>
    </div>
    <div class="info" @click="onUserClick">
      <div class="nickname">{{ profile.nickname }}</div>
      <div class="meta" v-if="profile.meta">{{ profile.meta }}</div>
    </div>
    <div class="more" @click.stop="toggleMenu">
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="more-icon" :class="{ active: showMenu }">
        <path d="M24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M24 12C25.1046 12 26 11.1046 26 10C26 8.89543 25.1046 8 24 8C22.8954 8 22 8.89543 22 10C22 11.1046 22.8954 12 24 12Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M24 40C25.1046 40 26 39.1046 26 38C26 36.8954 25.1046 36 24 36C22.8954 36 22 36.8954 22 38C22 39.1046 22.8954 40 24 40Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <Transition name="dropdown-fade">
        <div v-if="showMenu" class="menu" @click.stop>
          <button class="item" @click="onOpenProfile">Open profile</button>
          <button class="item danger" @click="onReport">Report</button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface AdminProfileCardProps {
  profile: { id: number; nickname: string; avatar?: string; meta?: string }
}
const props = defineProps<AdminProfileCardProps>()
const showMenu = ref(false)

const initials = computed(() => {
  const n = props.profile.nickname || ''
  return n.slice(0, 1).toUpperCase()
})

function toggleMenu() { showMenu.value = !showMenu.value }
function onOpenProfile() { showMenu.value = false }
function onReport() { showMenu.value = false }
function onUserClick() { /* navigate if needed */ }
</script>

<style scoped>
.profile-card {
  background-color: var(--bg-secondary);
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  font-family: var(--font-sans);
  min-height: 76px;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--btn-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar-fallback { color: var(--text-primary); font-weight: 800; }

.info { display: flex; flex-direction: column; gap: 2px; cursor: pointer; font-family: var(--font-sans); font-weight: bold; font-size: 23px; }
.nickname { font-size: 20px; color: var(--text-primary); font-family: var(--font-sans); font-weight: bold; }
.meta { font-size: 12px; opacity: 0.7; }

.more { margin-left: auto; position: relative; }
.more-icon { color: var(--text-secondary); cursor: pointer; transition: color .2s ease; }
.more-icon.active, .more-icon:hover { color: var(--text-primary); }

.menu { position: absolute; top: -6px; right: 0; background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 6px; min-width: 180px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.item { width: 100%; text-align: left; background: transparent; border: none; color: var(--text-primary); padding: 8px 10px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.item:hover { background: rgba(255,255,255,0.06); }
.item.danger { color: #ef4444; }

.dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: all .2s ease; }
.dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>


