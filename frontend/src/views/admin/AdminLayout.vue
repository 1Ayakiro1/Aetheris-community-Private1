<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar-header">Admin panel</div>
      <router-link to="/admin/articles" class="admin-link" :class="{ active: isActive('/admin/articles') }">Articles</router-link>
      <router-link to="/admin/comments" class="admin-link" :class="{ active: isActive('/admin/comments') }">Comments</router-link>
      <router-link to="/admin/profiles" class="admin-link" :class="{ active: isActive('/admin/profiles') }">Profiles</router-link>
    </aside>
    <main class="admin-content">
      <div class="admin-content-inner">
        <div class="admin-right-column">
          <router-view />
        </div>
      </div>
    </main>
  </div>
  
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<style lang="scss" scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  padding: 20px 0 40px 0; /* space from header and footer */
  width: 100%;
}

.admin-sidebar {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  height: 300px;
  flex-direction: column;
  gap: 8px;
}

.admin-sidebar-header {
  font-weight: bold;
  font-size: 23px;
  font-family: var(--font-sans);
  margin-bottom: 8px;
}

.admin-link {
  display: block;
  padding: 12px 14px;
  border-radius: 12px;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: bold;
  font-family: var(--font-sans);
  font-size: 20px;
}

.admin-link:hover { background: rgba(67,73,86,1); }
.admin-link.active { background: var(--btn-primary); }

.admin-content {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  width: 100%;
  display: flex;
}

.admin-content-inner {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-sans);
}

.admin-right-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>


