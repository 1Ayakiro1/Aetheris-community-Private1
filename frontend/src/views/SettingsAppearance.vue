<template>
  <div class="settings-appearance-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <div class="sidebar">
        <p class="sidebar-section-title">Display</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/appearance">
            <button class="sidebar-button active">
              <img class="button-icon1" src="/src/assets/imgs/eye.png" alt="eye">
              <p class="button-text">Appearance</p>
            </button>
          </router-link>
        </div>
        
        <p class="sidebar-section-title">Account</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/profile">
            <button class="sidebar-button">
                <svg class="svg1" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="30" height="30" fill="url(#pattern0_99_35)"/>
                    <defs>
                    <pattern id="pattern0_99_35" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_99_35" transform="scale(0.00390625)"/>
                    </pattern>
                    <image id="image0_99_35" width="256" height="256" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                    </defs>
                </svg>
              <p class="button-text">Display profile</p>
            </button>
          </router-link>
          
          <router-link to="/settings/privacy">
            <button class="sidebar-button">
                <svg class="svg2" width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 25.5834C11.5 25.5834 21.1667 20.75 21.1667 13.5V5.04169L11.5 1.41669L1.83333 5.04169V13.5C1.83333 20.75 11.5 25.5834 11.5 25.5834Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              <p class="button-text">Privacy & Security</p>
            </button>
          </router-link>
          
          <router-link to="/settings/sessions">
            <button class="sidebar-button">
                <svg class="svg3" width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.5833 12.5H20.75L17.125 23.375L9.875 1.625L6.25 12.5H1.41667" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
              <p class="button-text">Sessions</p>
            </button>
          </router-link>
          
          <router-link to="/settings/subscription">
            <button class="sidebar-button">
                <svg class="svg4" width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.1667 1.25L7.875 14.5417L1.83333 8.5" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg> 
              <p class="button-text">Subscription</p>
            </button>
          </router-link>
        </div>
        
        <p class="sidebar-section-title">Another</p>
        <div class="sidebar-buttons-group">
          <router-link to="/settings/support">
            <button class="sidebar-button">
                <svg class="svg5" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 8.66663V13.5M13.5 18.3333H13.5121M25.5833 13.5C25.5833 20.1734 20.1734 25.5833 13.5 25.5833C6.82656 25.5833 1.41667 20.1734 1.41667 13.5C1.41667 6.82652 6.82656 1.41663 13.5 1.41663C20.1734 1.41663 25.5833 6.82652 25.5833 13.5Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              <p class="button-text">Support & info</p>
            </button>
          </router-link>
          
          <router-link to="/settings/another">
            <button class="sidebar-button">
                <svg class="svg6" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.7625 6.61247C15.5411 6.83834 15.4171 7.14201 15.4171 7.4583C15.4171 7.77458 15.5411 8.07826 15.7625 8.30413L17.6958 10.2375C17.9217 10.4589 18.2254 10.5829 18.5417 10.5829C18.858 10.5829 19.1616 10.4589 19.3875 10.2375L23.9429 5.68205C24.5505 7.02474 24.7345 8.52071 24.4703 9.9706C24.2061 11.4205 23.5064 12.7554 22.4643 13.7976C21.4221 14.8397 20.0872 15.5394 18.6373 15.8036C17.1874 16.0678 15.6914 15.8838 14.3488 15.2762L5.99917 23.6258C5.51846 24.1065 4.86649 24.3766 4.18667 24.3766C3.50685 24.3766 2.85487 24.1065 2.37417 23.6258C1.89346 23.1451 1.62341 22.4931 1.62341 21.8133C1.62341 21.1335 1.89346 20.4815 2.37417 20.0008L10.7238 11.6512C10.1162 10.3085 9.93219 8.81256 10.1964 7.36267C10.4605 5.91277 11.1603 4.57782 12.2024 3.53571C13.2445 2.4936 14.5795 1.79384 16.0294 1.52966C17.4793 1.26549 18.9752 1.44946 20.3179 2.05705L15.7625 6.61247Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              <p class="button-text">Another</p>
            </button>
          </router-link>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <!-- Color Theme Section -->
        <div class="theme-section">
          <h1 class="section-title">Color theme</h1>
          <h2 class="section-subtitle">Choose your favorite color theme for this web-site</h2>
          
          <div class="theme-buttons">
            <button 
              data-theme="system" 
              class="theme-button"
              :class="{ active: selectedTheme === 'system' }"
              @click="selectTheme('system')"
            >
              <div class="theme-preview">
                <img :src="themeImages['system']" alt="System theme preview" class="theme-preview-image" />
              </div>
              <div class="theme-label">
                <div class="theme-indicator">
                  <div class="theme-indicator-dot"></div>
                </div>
                <p class="theme-text">System theme</p>
              </div>
            </button>

            <button 
              data-theme="white" 
              class="theme-button"
              :class="{ active: selectedTheme === 'white' }"
              @click="selectTheme('white')"
            >
              <div class="theme-preview">
                <img :src="themeImages['white']" alt="White theme preview" class="theme-preview-image" />
              </div>
              <div class="theme-label">
                <div class="theme-indicator">
                  <div class="theme-indicator-dot"></div>
                </div>
                <p class="theme-text">White</p>
              </div>
            </button>

            <button 
              data-theme="aquamarine" 
              class="theme-button"
              :class="{ active: selectedTheme === 'aquamarine' }"
              @click="selectTheme('aquamarine')"
            >
              <div class="theme-preview">
                <img :src="themeImages['aquamarine']" alt="Aquamarine theme preview" class="theme-preview-image" />
              </div>
              <div class="theme-label">
                <div class="theme-indicator">
                  <div class="theme-indicator-dot"></div>
                </div>
                <p class="theme-text">Aquamarine</p>
              </div>
            </button>

            <button 
              data-theme="night-dark" 
              class="theme-button"
              :class="{ active: selectedTheme === 'night-dark' }"
              @click="selectTheme('night-dark')"
            >
              <div class="theme-preview">
                <img :src="themeImages['night-dark']" alt="Dark theme preview" class="theme-preview-image" />
              </div>
              <div class="theme-label">
                <div class="theme-indicator">
                  <div class="theme-indicator-dot"></div>
                </div>
                <p class="theme-text">Dark</p>
              </div>
            </button>
          </div>
        </div>
        
        <!-- Article Font Section -->
        <div class="font-section">
          <h1 class="section-title">Article font</h1>
          <h2 class="section-subtitle">Choose a font that is convenient for you, which will be used in the article as the main one</h2>
          
          <button class="font-select-button">
            <p class="font-select-text">Select font</p>
            <svg class="dropdown-icon" width="22" height="12" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.25 2.375L12.5 12.625L22.75 2.375" stroke="#9BA4AE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="font-preview">
            <h1 class="font-preview-text">Example of text article. Here exist more different words,which can use in any article and news,science facts and another places</h1>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Импорты изображений тем
import theme1Image from '@/assets/imgs/theme3.png'
import theme2Image from '@/assets/imgs/theme2.png'
import theme3Image from '@/assets/imgs/theme1.png'
import { useTheme } from '@/composables/useTheme'

// Используем composable для управления темами
const { selectedTheme, selectTheme } = useTheme()

const themeImages = {
  'system': theme1Image,
  'white': theme2Image,
  'aquamarine': theme3Image,
  'night-dark': theme1Image
}
</script>

<style scoped lang="scss">
.settings-appearance-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.main-body {
  display: flex;
  margin-top: 48px; // mt-12
}

// Sidebar Styles
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

.button-icon1,
.button-icon2,
.button-icon3,
.button-icon4,
.button-icon5,
.button-icon6,
.button-icon7 {
  width: 26px;
  height: 19px;
  margin-left: 16px;
  border-radius: 2px;
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

.svg1,
.svg2,
.svg3,
.svg4,
.svg5,
.svg6 {
  margin-left: 15px;
}

.theme-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 346px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.section-title {
  margin-top: 48px; // mt-12
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

.theme-buttons {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-left: 48px;
  margin-top: 16px;
}

.theme-button {
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px); // Легкий подъем при наведении
  }

  // Состояние при наведении
  &:hover .theme-indicator-dot {
    background-color: #8b5cf6; // purple-500 - только центральный кружок
  }

  // Состояние активной темы
  &.active {
    transform: scale(1.02); // Легкое увеличение активной темы
  }
  
  // Активный блок при наведении тоже должен подниматься
  &.active:hover {
    transform: scale(1.02) translateY(-2px); // Увеличение + подъем
  }
  
  &.active .theme-indicator {
    border-color: #8b5cf6; // purple-500
    width: 22px; // Увеличиваем размер вместо scale
    height: 22px;
    margin-left: 15px; // Корректируем отступ
  }
  
  &.active .theme-indicator-dot {
    background-color: #8b5cf6; // purple-500
    width: 12.5px; // Увеличиваем размер вместо scale
    height: 12.5px;
  }
}

.theme-preview {
  width: 208px;
  height: 145px;
  background-color: var(--btn-primary);
  border-radius: 25px 25px 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25px 25px 0 0;
}

.theme-label {
  width: 208px;
  height: 40px;
  background-color: var(--btn-primary);
  display: flex;
  align-items: center;
  border-radius: 0 0 25px 25px;
  position: absolute;
  margin-top: 130px;
}

.theme-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db; // gray-300 - цвет границы по умолчанию
  border-radius: 50%;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.theme-indicator-dot {
  width: 11.5px;
  height: 11.5px;
  background-color: transparent; // Прозрачный по умолчанию
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}

.theme-text {
  color: var(--text-primary);
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 8px;
}

// Font Section Styles
.font-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 440px;
  border-radius: 25px;
  margin-top: 12px;
}

.font-select-button {
  width: 200px;
  height: 47px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 20px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  color: var(--text-third);
  margin-top: 32px; // mt-8
  margin-left: 48px; // ml-12
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.font-select-text {
  color: var(--text-primary);
  margin-left: 32px; // ml-8
}

.dropdown-icon {
  margin-left: 16px; // ml-4
}

.font-preview {
  width: 900px;
  height: 170px;
  background-color: var(--btn-primary);
  border-radius: 25px;
  margin-top: 24px; // mt-6
  margin-left: 40px; // ml-10
  display: flex;
  justify-content: center;
}

.font-preview-text {
  color: var(--text-primary);
  font-size: 18px;
  font-family: var(--font-sans);
  font-weight: 600;
  margin-top: 24px; // mt-6
  text-align: center;
  width: 700px;
}
</style>