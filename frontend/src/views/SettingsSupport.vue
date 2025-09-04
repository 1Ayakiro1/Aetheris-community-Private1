<template>
  <div class="settings-support-container">
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
            <button class="sidebar-button active">
              <div class="button-icon"></div>
              <p class="button-text">Support & info</p>
            </button>
          </router-link>
          
          <router-link to="/settings/another">
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Another</p>
            </button>
          </router-link>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <!-- Support Section -->
        <div class="support-section">
          <h1 class="section-title">Support</h1>
          <h2 class="section-subtitle">You can support our project on various platforms, thereby helping in the further development of the community and improvement of technologies</h2>
          <h2 class="section-subtitle">By supporting us, you become a volunteer and an active member of the community, you will have access to increased privileges</h2>
          
          <!-- Support Icons -->
          <div class="support-icons">
            <!-- Patreon -->
            <button class="support-button">
              <div class="support-icon patreon"></div>
            </button>
            
            <!-- Co-Fi -->
            <button class="support-button">
              <div class="support-icon cofi"></div>
            </button>
            
            <!-- Bitcoin -->
            <button class="support-button">
              <div class="support-icon bitcoin"></div>
            </button>
            
            <!-- ETH -->
            <button class="support-button">
              <div class="support-icon eth"></div>
            </button>
          </div>
          
          <div class="support-note">
            <div class="note-icon"></div>
            <h2 class="note-text">click to go or copy</h2>
          </div>
        </div>
        
        <!-- GitHub Section -->
        <div class="github-section">
          <h1 class="section-title">Github</h1>
          <h2 class="section-subtitle">We are an open community and encourage improvements and suggestions from our users, and also host interesting projects and code on our Github</h2>
          
          <!-- GitHub Link -->
          <a href="https://github.com/1Ayakiro1/Aetheris_Community" class="github-link">
            <div class="github-card">
              <div class="github-icon"></div>
              <h1 class="github-title">Aetheris-Community</h1>
              <h2 class="github-stats">0 stars</h2>
              <h2 class="github-stats">0 commits</h2>
              <h2 class="github-stats">0 activity</h2>
            </div>
          </a>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Support settings logic can be added here
</script>

<style scoped lang="scss">
.settings-support-container {
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
}

.support-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 400px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.github-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 350px;
  border-radius: 25px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
}

.section-title {
  margin-top: 40px; // mt-10
  margin-left: 48px; // ml-12
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 16px;
  margin-left: 48px;
  width: 850px;
}

// Support Icons
.support-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  gap: 40px;
}

.support-button {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 2px solid #ECF9FB;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.5);
  }
}

.support-icon {
  width: 41px;
  height: 45px;
  margin: 15px auto;
  background-color: white;
  border-radius: 2px;
}

.note-icon {
  width: 27px;
  height: 27px;
  background-color: #5A6272;
  border-radius: 2px;
}

.support-note {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  margin-left: 384px; // ml-96
}

.note-text {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 8px;
  width: 850px;
}

// GitHub Section
.github-link {
  text-decoration: none;
  margin-left: 48px;
  margin-top: 48px;
}

.github-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--bg-primary);
  border: 2px solid #9BA4AE;
  border-radius: 25px;
  width: 880px;
  height: 139px;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #505BE5;
  }
}

.github-icon {
  width: 76px;
  height: 76px;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  margin-left: 24px;
  background-color: var(--ico-color);
}

.github-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 24px;
}

.github-stats {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 24px;
}
</style>