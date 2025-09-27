<template>
  <div class="notifications-container">
    <h2 class="main-header">Your notifications</h2>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.notifications-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 40px 180px;
}

.main-header {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
}
</style>