<template>
  <div class="settings-support-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <SettingsSidebar />
      
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
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
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