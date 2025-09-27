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
  width: 118px;
  height: 134px;
  object-fit: contain;
  
  // Уменьшенное масштабирование для логотипа
  @include responsive-2k {
    width: 130px;  // +10% вместо +40%
    height: 147px;
  }
  
  @include responsive-4k {
    width: 142px;  // +20% вместо +80%
    height: 161px;
  }
}
</style>
