<template>
  <div>
    <h1 class="in-work">{{ $t('common.in_development') }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>

.in-work {
  color: var(--text-secondary);
  font-size: 30px;
  font-family: var(--font-sans);
  margin-top: 320px;
  font-weight: bold;
}
</style>
