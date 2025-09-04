<template>
  <div class="settings-profile-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <div class="sidebar">
        <p class="sidebar-section-title">Display</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/appearance">
            <button class="sidebar-button">
              <svg class="button-icon" width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 7L13 13L25 7L13 1Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 7L13 13L25 7" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="button-text">Appearance</p>
            </button>
          </router-link>
        </div>
        
        <p class="sidebar-section-title">Account</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/profile">
            <button class="sidebar-button active">
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
            <button class="sidebar-button">
              <div class="button-icon"></div>
              <p class="button-text">Another</p>
            </button>
          </router-link>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <!-- Profile Information Section -->
        <div class="profile-section">
          <h1 class="section-title">Profile information</h1>
          <h2 class="section-subtitle">Menu for changing profile information that is displayed to all users</h2>
          
          <!-- Avatar Section -->
          <h1 class="section-title">Avatar</h1>
          <div class="avatar-section">
            <div class="avatar-placeholder"></div>
            <div class="avatar-buttons">
              <button class="avatar-button">upload image</button>
              <button class="avatar-button">remove image</button>
            </div>
            <button class="reset-button">
              <div class="reset-icon"></div>
              <p class="reset-text">reset</p>
            </button>
          </div>
          
          <!-- Nickname Section -->
          <h1 class="section-title">Nickname</h1>
          <h2 class="section-subtitle">Change the name displayed on your account</h2>
          <input 
            type="text" 
            placeholder="Enter your nickname" 
            class="nickname-input"
            v-model="nickname"
          />
          
          <!-- Bio Section -->
          <h1 class="section-title">Bio</h1>
          <h2 class="section-subtitle">Add information about you and your hobbies and skills</h2>
          <textarea 
            placeholder="Enter your bio" 
            class="bio-input"
            v-model="bio"
          ></textarea>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nickname = ref('')
const bio = ref('')
</script>

<style scoped lang="scss">
.settings-profile-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.main-body {
  display: flex;
  margin-top: 48px; // mt-12
}

// Sidebar Styles (same as SettingsAppearance)
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

.profile-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 949px;
  border-radius: 25px;
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

// Avatar Section
.avatar-section {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-left: 48px;
  margin-top: 16px;
}

.avatar-placeholder {
  background-color: var(--btn-primary);
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.avatar-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.avatar-button {
  width: 230px;
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
  justify-content: center;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }

  &:first-child {
    margin-top: 16px; // mt-4
  }
}

.reset-button {
  width: 200px;
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
  justify-content: center;
  border: none;
  cursor: pointer;
  margin-top: 48px; // mt-12

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.reset-icon {
  width: 27px;
  height: 26px;
  background-color: var(--ico-color);
  border-radius: 2px;
}

.reset-text {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 8px;
}

// Input Fields
.nickname-input {
  width: 360px;
  height: 65px;
  background-color: var(--btn-primary);
  border-radius: 15px;
  margin-left: 48px;
  margin-top: 16px;
  font-weight: bold;
  padding: 0 16px;
  font-size: 22px;
  color: var(--text-primary);
  border: none;
  font-family: var(--font-sans);

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border: 2px solid var(--primary-blue);
  }
}

.bio-input {
  width: 520px;
  height: 167px;
  background-color: var(--btn-primary);
  border-radius: 15px;
  margin-left: 48px;
  margin-top: 16px;
  font-weight: bold;
  padding: 16px;
  font-size: 22px;
  color: var(--text-primary);
  border: none;
  font-family: var(--font-sans);
  resize: vertical;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border: 2px solid var(--primary-blue);
  }
}
</style>