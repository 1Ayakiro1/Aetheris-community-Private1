<template>
  <div class="faq-help-container">
    <!-- Body -->
    <h2 class="page-title">Frequently Asked Questions</h2>
    <div class="content-wrapper">
      <!-- Sidebar -->
      <div class="sidebar">
        <router-link to="/faq">
          <button class="sidebar-button">FAQ</button>
        </router-link>
        <router-link to="/faq/user-ranks">
          <button class="sidebar-button">User ranks</button>
        </router-link>
        <router-link to="/faq/clan-ranks">
          <button class="sidebar-button">Clan ranks</button>
        </router-link>
        <router-link to="/faq/keywords">
          <button class="sidebar-button">Keywords</button>
        </router-link>
        <router-link to="/faq/changes">
          <button class="sidebar-button">Site changes</button>
        </router-link>
        <router-link to="/faq/help">
          <button class="sidebar-button">Help</button>
        </router-link>
      </div>
      
      <!-- Content -->
      <div class="content">
        <h2 class="content-title">Help</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No imports needed - header and footer are in main layout
</script>

<style scoped lang="scss">
.faq-help-container {
  max-width: 120rem;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 6.25rem;
  padding-bottom: 12.5rem;
}

.page-title {
  color: var(--text-primary);
  font-size: 1.875rem;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 1.25rem;
  text-align: center;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: 1.25rem;
  width: 414px;
  height: 429px;
  margin-left: 176px;
  margin-top: 56px;
  gap: 0.5rem;
}

.sidebar-button {
  width: 333px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 0.9375rem;
  color: var(--text-primary);
  font-size: 1.5625rem;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.content {
  width: 93.125rem;
  height: 12.5rem;
  background-color: var(--bg-secondary);
  border-radius: 1.25rem;
  margin-left: 12px;
  margin-top: 56px;
}

.content-title {
  color: var(--text-primary);
  font-size: 1.875rem;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 1.25rem;
  text-align: center;
}
</style>