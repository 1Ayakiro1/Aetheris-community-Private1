<template>
  <div class="settings-privacy-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <SettingsSidebar />
      
      <!-- Content -->
      <div class="content">
        <!-- Account Security Section -->
        <div class="security-section">
          <h1 class="section-title">Account security</h1>
          <h2 class="section-subtitle">settings to enhance the security of your account</h2>
          
          <div class="security-options">
            <!-- Email -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">Email</h1>
                <h2 class="option-subtitle">change your account email to receive confirmation code and announcements</h2>
              </div>
              <button class="option-button">Change email</button>
            </div>
            
            <!-- Password -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">Password</h1>
                <h2 class="option-subtitle">create a new password for account security</h2>
              </div>
              <button class="option-button">Change password</button>
            </div>
            
            <!-- 2FA -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">2FA</h1>
                <h2 class="option-subtitle">set up a second layer of protection for your account(recommended)</h2>
              </div>
              <button class="option-button">add 2FA</button>
            </div>
            
            <!-- Download Data -->
            <div class="security-option">
              <div class="option-info">
                <h1 class="option-title">Download data</h1>
                <h2 class="option-subtitle">Download the data we store</h2>
              </div>
              <button class="option-button">Download</button>
            </div>
          </div>
        </div>
        
        <!-- Data Management Section -->
        <div class="data-section">
          <h1 class="section-title">Deleting and hiding data</h1>
          <h2 class="section-subtitle">section for completely deleting all information from our community</h2>
          
          <div class="data-options">
            <!-- Delete Account -->
            <div class="data-option">
              <div class="option-info">
                <h1 class="option-title danger">Delete account</h1>
                <h2 class="option-subtitle">deleting account and information about it</h2>
              </div>
              <button class="option-button danger">Delete</button>
            </div>
            
            <!-- Hide Profile -->
            <div class="data-option">
              <div class="option-info">
                <h1 class="option-title danger">Hide profile</h1>
                <h2 class="option-subtitle">hide profile and all info about it</h2>
              </div>
              <button class="option-button danger">Hide</button>
            </div>
            
            <!-- Extra Lock -->
            <div class="data-option">
              <div class="option-info">
                <h1 class="option-title danger">Extra lock</h1>
                <h2 class="option-subtitle">Have you been hacked? Isolate your profile completely for a while</h2>
              </div>
              <button class="option-button danger">Lock</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import SettingsSidebar from '@/components/SettingsSidebar.vue'
// Privacy settings logic can be added here
</script>

<style scoped lang="scss">
.settings-privacy-container {
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

.security-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 600px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.data-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 430px;
  border-radius: 25px;
  margin-top: 12px;
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
  margin-top: 8px;
  margin-left: 48px;
  width: 700px;
}

// Security Options
.security-options {
  display: flex;
  flex-direction: column;
  margin-left: 48px;
  margin-top: 32px;
  gap: 16px;
}

.security-option {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.option-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.option-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 0;

  &.danger {
    color: var(--text-red);
  }
}

.option-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 4px;
  width: 660px;
}

.option-button {
  width: 300px;
  height: 59px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  margin-right: 48px;
  margin-top: 24px;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }

  &.danger {
    background-color: rgba(255, 59, 59, 0);
    color: var(--text-red);

    &:hover {
      background-color: rgba(255, 59, 59, 1);
      color: var(--text-primary);
    }
  }
}

// Data Options
.data-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 48px;
  margin-top: 16px;
}

.data-option {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>