<template>
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
</template>

<script setup lang="ts">
// No props yet; component is purely presentational.
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  /* Strict, non-shrinking width */
  width: 414px;
  min-width: 414px;
  max-width: 414px;
  flex: 0 0 414px; /* do not shrink in flex rows */
  box-sizing: border-box;
  height: 429px;
  margin-top: 56px;
  gap: 8px;
}

.sidebar-button {
  width: 333px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}
</style>


