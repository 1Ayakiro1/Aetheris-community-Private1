<template>
  <div class="legal-content-rules-container">
    <!-- Body -->
    <h2 class="page-title">Site Policy Page</h2>
    <div class="content-wrapper">
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Legal block -->
        <div class="sidebar-block legal-block">
          <h3 class="block-title">Legal</h3>
          <div class="button-column">
            <router-link to="/legal/content-rules">
              <button class="sidebar-button">Content rules</button>
            </router-link>
            <router-link to="/legal/terms-of-use">
              <button class="sidebar-button">Terms of use</button>
            </router-link>
            <router-link to="/legal/copyright-policy">
              <button class="sidebar-button">Copyright policy</button>
            </router-link>
            <router-link to="/legal/another">
              <button class="sidebar-button">Another</button>
            </router-link>
          </div>
        </div>
        
        <!-- Community rules block -->
        <div class="sidebar-block community-block">
          <router-link to="/legal/community-rules">
            <button class="sidebar-button">Community rules</button>
          </router-link>
        </div>
        
        <!-- Security block -->
        <div class="sidebar-block security-block">
          <h3 class="block-title">Security</h3>
          <div class="button-column">
            <router-link to="/legal/privacy-policy">
              <button class="sidebar-button">Privacy Policy</button>
            </router-link>
            <router-link to="/legal/security">
              <button class="sidebar-button">Another</button>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <div class="content-block">
          <!-- Content will be added here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style lang="scss" scoped>
.legal-content-rules-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 370px;
  height: 655px; // 330px + 84px + 221px + gaps = 655px
}

.sidebar-block {
  background-color: var(--bg-secondary);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  width: 370px;
    
  &.legal-block {
    height: 330px; // Уменьшаем высоту legal блока
  }
  
  &.community-block {
    align-items: center;
    height: 84px; // Фиксированная высота для community блока
  }
  
  &.security-block {
    padding: 16px; // Добавляем padding чтобы кнопки не втыкались в края
    height: 221px; // Фиксированная высота для security блока
  }
}

.block-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 16px;
  margin-left: 48px;
}

.button-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  margin-top: 8px;
  
  .security-block & {
    gap: 10px;
    margin-top: 16px;
  }
}

.sidebar-button {
  width: 300px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border: none;
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 23px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
  
  .community-block & {
    margin-top: 16px;
  }
}

.content {
  display: flex;
  justify-content: center;
}

.content-block {
  width: 1000px;
  height: 655px;
  background-color: var(--bg-secondary);
  border-radius: 20px;
}
</style>