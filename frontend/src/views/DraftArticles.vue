<template>
  <div>
    <h1 class="main-header">{{ $t('common.in_development') }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.main-header {
  color: var(--text-secondary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
}
</style>
