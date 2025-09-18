<template>
  <div class="legal-copyright-policy-container">
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
.legal-copyright-policy-container {
  max-width: 120rem;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 6.25rem;
  padding-bottom: 12.5rem;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: var(--text-primary);
  font-size: 1.875rem;
  font-family: var(--font-sans-serif);
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 1rem;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.sidebar-block {
  background-color: var(--bg-secondary);
  border-radius: 1.5625rem;
  display: flex;
  flex-direction: column;
  
  &.legal-block {
    width: 23.125rem;
    height: 31.875rem;
  }
  
  &.community-block {
    width: 23.125rem;
    height: 84px;
    align-items: center;
  }
  
  &.security-block {
    width: 23.125rem;
    height: 221px;
  }
}

.block-title {
  color: var(--text-primary);
  font-size: 1.5625rem;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 3rem;
}

.button-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
  margin-top: 0.5rem;
  
  .security-block & {
    gap: 0.625rem;
    margin-top: 1rem;
  }
}

.sidebar-button {
  width: 18.75rem;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border: none;
  border-radius: 0.9375rem;
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
    margin-top: 1rem;
  }
}

.content {
  display: flex;
  justify-content: center;
}

.content-block {
  width: 1000px;
  height: 791px;
  background-color: var(--bg-secondary);
  border-radius: 1.25rem;
}
</style>