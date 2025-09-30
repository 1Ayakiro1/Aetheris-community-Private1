<template>
  <div class="settings-another-container">
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <SettingsSidebar />
      
      <!-- Content -->
      <div class="content">
        <div class="development-message">
          <h1 class="development-text">{{ $t('common.in_development') }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Another settings logic can be added here
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.settings-another-container {
  margin: 0 auto; padding: 0 16px; box-sizing: border-box;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.main-body {
  display: flex;
  margin-top: 48px; // mt-12
}


// Content Styles
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 12px;
  justify-content: center;
  flex: 1;
}

.development-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.development-text {
  color: var(--text-secondary);
  font-size: 30px;
  font-family: var(--font-sans);
  padding-left: 320px;
  margin-right: 230px;
  font-weight: bold;
}
</style>
