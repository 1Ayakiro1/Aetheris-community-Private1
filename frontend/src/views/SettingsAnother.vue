<template>
  <div class="settings-another-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <div class="sidebar">
        <p class="sidebar-section-title">Display</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/appearance">
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Appearance</p>
            </button>
          </router-link>
        </div>
        
        <p class="sidebar-section-title">Account</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/profile">
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Display profile</p>
            </button>
          </router-link>
          
          <router-link to="/settings/privacy">
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Privacy & Security</p>
            </button>
          </router-link>
          
          <router-link to="/settings/sessions">
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Sessions</p>
            </button>
          </router-link>
          
          <router-link to="/settings/subscription">
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Subscription</p>
            </button>
          </router-link>
        </div>
        
        <p class="sidebar-section-title">Another</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/support">
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Support & info</p>
            </button>
          </router-link>
          
          <router-link to="/settings/another">
            <button class="sidebar-button active">
              <div class="button-icon"></div>
              <p class="button-text">Another</p>
            </button>
          </router-link>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <div class="development-message">
          <h1 class="development-text">This page in development now</h1>
          <p class="development-subtitle">We are working on additional settings and features for this section.</p>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Another settings logic can be added here
</script>

<style scoped lang="scss">
.settings-another-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.main-body {
  display: flex;
  margin-top: 48px; // mt-12
}

// Sidebar Styles (same as other settings pages)
.sidebar {
  width: 395px;
  height: 685px;
  background-color: var(--bg-secondary);
  margin-left: 176px; // ml-44
  border-radius: 25px;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
  }
}

.sidebar-section-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 33px;
  margin-left: 44px;
}

.sidebar-buttons-group {
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  margin-left: 44px;
  gap: 8px;
}

.sidebar-button {
  width: 300px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 23px;
  font-family: var(--font-sans);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  margin-top: 3px;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
    text-decoration: none;
  }

  &.active {
    background-color: rgba(67, 73, 86, 1);
    text-decoration: none;
  }
}

.button-icon {
  width: 26px;
  height: 19px;
  margin-left: 16px;
  background-color: var(--ico-color);
  border-radius: 2px;
}

.button-text {
  margin-left: 16px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  text-align: center;
}

.development-text {
  color: var(--text-secondary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 16px;
}

.development-subtitle {
  color: var(--text-secondary);
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: normal;
  opacity: 0.8;
}
</style>
