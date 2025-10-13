<template>
  <Toast />
  <div v-if="$route.name === 'Welcome'">
    <div class="app-wrapper home-header-wrapper">
      <AppHeader />
    </div>
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
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
  }
  
  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 90%;
    padding: 0 20px;
  }
  
  /* Десктоп небольшой */
  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 85%;
    max-width: 1200px;
    padding: 0 24px;
  }
  
  /* Десктоп средний */
  @media (min-width: 1441px) and (max-width: 1920px) {
    width: 80%;
    max-width: 1400px;
    padding: 0 28px;
  }
  
  /* Большие экраны */
  @media (min-width: 1921px) {
    width: 75%;
    max-width: 1600px;
    padding: 0 32px;
  }
}

.app-main {
  padding: 0;
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Специальный стиль,применяется только к home page,
чтоб не было проблем с отображением элементов хэдера*/
.home-header-wrapper {
  min-height: 100px !important;
  height: 100px;
}
</style>
