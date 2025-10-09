<template>
  <div class="faq-keywords-container">
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
        <h2 class="content-title">Keywords</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.faq-keywords-container {
  width: 100%; max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;


}

.page-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 20px;
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
  border-radius: 20px;
  width: 414px;
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
  font-family: var(--font-sans);
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;



  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.content {
  width: 990px;
  height: 200px;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  margin-left: 12px;
  margin-top: 56px;


}

.content-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 20px;
  text-align: center;


}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
}
</style>