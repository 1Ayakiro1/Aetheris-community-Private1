<template>
  <div class="app-wrapper">
    <AppHeader />
    
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<style lang="scss" scoped>
.app-wrapper {
  min-height: 100vh;
  background: var(--bg-primary);
}

.app-main {
  padding: 2rem 0;
}
</style>
