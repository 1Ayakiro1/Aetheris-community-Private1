<template>
  <!-- Для Home page без wrapper -->
  <div v-if="$route.name === 'Home'">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
  
  <!-- Для остальных страниц с wrapper -->
  <div v-else>
    <div class="app-wrapper">
      <AppHeader />
      
      <main class="app-main">
        <router-view />
      </main>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

// Принудительно устанавливаем тему при загрузке
onMounted(() => {
  if (!document.documentElement.getAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'aquamarine')
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  background-color: var(--bg-primary);
  min-height: 100vh;
  position: relative;
  width: 72%; /* Базовая ширина */
  margin: 0 auto; /* Центрируем блок */
  box-sizing: border-box;
  
  /* Базовое разрешение ≤1920px */
  @media (max-width: 1920px) {
    width: 72%;
    padding: 0 20px;
  }
  
  /* 2K разрешение (2561-3839px) */
  @media (min-width: 2561px) and (max-width: 3839px) {
    width: 72%;
    padding: 0 26px; /* 20px * 1.3 */
  }
  
  /* 4K разрешение (≥3840px) */
  @media (min-width: 3840px) {
    width: 72%;
    padding: 0 32px; /* 20px * 1.6 */
  }
}

.app-main {
  padding: 0;
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем контент по горизонтали */
  width: 100%;
  
  /* Базовое разрешение ≤1920px */
  @media (max-width: 1920px) {
    max-width: 1920px;
  }
  
  /* 2K разрешение (2561-3839px) */
  @media (min-width: 2561px) and (max-width: 3839px) {
    max-width: 2496px; /* 1920px * 1.3 */
  }
  
  /* 4K разрешение (≥3840px) */
  @media (min-width: 3840px) {
    max-width: 3072px; /* 1920px * 1.6 */
  }
}
</style>
