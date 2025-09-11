<template>
  <div class="app-wrapper">
    <AppHeader />
    
    <main class="app-main">
      <router-view />
    </main>
    
    <AppFooter />
  </div>

</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<style lang="scss" scoped>
.app-wrapper {
  background-color: var(--bg-primary);
  min-height: 100vh;
  position: relative;
}

.app-main {
  padding: 0;
  background-color: var(--bg-primary);
}
</style>
