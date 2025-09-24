<template>
  <div class="settings-another-container">
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <SettingsSidebar />
      
      <!-- Content -->
      <div class="content">
        <div class="development-message">
          <h1 class="development-text">This page in development now</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsSidebar from '@/components/SettingsSidebar.vue'
// Another settings logic can be added here
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.settings-another-container {
  @include scale-property(max-width, 1920px);
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.main-body {
  display: flex;
  @include scale-property(margin-top, 48px); // mt-12
}


// Content Styles
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include scale-property(margin-left, 12px);
  justify-content: center;
  flex: 1;
}

.development-message {
  display: flex;
  justify-content: center;
  align-items: center;
  @include scale-property(height, 400px);
}

.development-text {
  color: var(--text-secondary);
  @include scale-property(font-size, 30px);
  font-family: var(--font-sans);
  font-weight: bold;
}
</style>
