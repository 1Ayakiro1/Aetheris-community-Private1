<template>
  <div class="logo-container">
    <img src="../assets/svgs/logo.svg" alt="Aetheris Community Logo" class="logo-image" />
  </div>
</template>

<script setup lang="ts">
// Простой компонент для логотипа
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.logo-container {
  display: flex;
  align-items: center;
  margin-left: auto; /* Убираем отступ для прижимания к краю */
  
  @include responsive-2k {
    margin-left: 0;
  }
  
  @include responsive-4k {
    margin-left: 0;
  }
}

.logo-image {
  @include scale-property(width, 118px);
  @include scale-property(height, 134px);
  object-fit: contain;
}
</style>
