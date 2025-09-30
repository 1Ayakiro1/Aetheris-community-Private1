<template>
  <div class="settings-sessions-container">
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <SettingsSidebar />
      
      <!-- Content -->
      <div class="content">
        <!-- Active Sessions Section -->
        <div class="sessions-section">
          <h1 class="section-title">{{ $t('settings.sessions.h1') }}</h1>
          <h2 class="section-subtitle">{{ $t('settings.sessions.subtitle') }}</h2>
          <h2 class="section-warning">{{ $t('settings.sessions.subtitle2') }}</h2>
          
          <div class="sessions-content">
            <!-- Session placeholder -->
            <div class="session-placeholder"></div>
            
            <!-- Delete all sessions button -->
            <button class="delete-all-button" @click="deleteAllSessions">
              {{ $t('settings.sessions.button1') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import SettingsSidebar from '@/components/SettingsSidebar.vue'

const deleteAllSessions = () => {
  // Logic for deleting all sessions
  console.log('Deleting all sessions...')
}
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.settings-sessions-container {
  margin: 0 auto; padding: 0 16px; box-sizing: border-box;
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

.sessions-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 900px;
  border-radius: 25px;
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
}

.section-title {
  margin-top: 40px; // mt-10
  margin-left: 48px; // ml-12
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 4px;
  margin-left: 48px;
  width: 700px;
}

.section-warning {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 16px;
  margin-left: 48px;
  width: 900px;
}

.sessions-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
}

.session-placeholder {
  background-color: var(--bg-primary);
  width: 890px;
  height: 139px;
  border-radius: 25px;
  margin-left: 48px;
}

.delete-all-button {
  width: 890px;
  height: 59px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 23px;
  font-family: var(--font-sans);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  margin-left: 48px;
  margin-top: 16px;

  &:hover {
    background-color: var(--text-red);
  }
}
</style>