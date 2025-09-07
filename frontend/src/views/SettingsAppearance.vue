<template>
  <div class="settings-appearance-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <SettingsSidebar />
        
        
      
      <!-- Content -->
      <div class="content">
        <!-- Color Theme Section -->
        <div class="theme-section">
          <h1 class="section-title">{{ t('settings.appearance.theme') }}</h1>
          <h2 class="section-subtitle">{{ t('settings.appearance.theme.subtitle') }}</h2>
          
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
                <p class="theme-text">{{ t('settings.appearance.theme.system') }}</p>
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
                <p class="theme-text">{{ t('settings.appearance.theme.white') }}</p>
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
                <p class="theme-text">{{ t('settings.appearance.theme.aquamarine') }}</p>
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
                <p class="theme-text">{{ t('settings.appearance.theme.dark') }}</p>
              </div>
            </button>
          </div>
        </div>
        
        <!-- Language Section -->
        <div class="language-section">
          <h1 class="section-title">{{ t('settings.appearance.language') }}</h1>
          <h2 class="section-subtitle">{{ t('settings.appearance.language.subtitle') }}</h2>
          
          <div class="language-dropdown">
            <button 
              class="language-select-button"
              @click="toggleLanguageDropdown"
            >
              <div class="selected-language">
                <span class="language-flag">{{ getCurrentLanguageFlag() }}</span>
                <span class="language-name">{{ getCurrentLanguageName() }}</span>
              </div>
              <svg class="dropdown-icon" width="22" height="12" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 2.375L12.5 12.625L22.75 2.375" stroke="#9BA4AE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <div 
              class="language-dropdown-menu"
              :class="{ 'open': isLanguageDropdownOpen }"
            >
              <div 
                class="language-option"
                :class="{ 'active': getCurrentLanguage === 'en' }"
                @click="selectLanguage('en')"
              >
                <span class="language-flag">🇺🇸</span>
                <span class="language-name">English</span>
              </div>
              
              <div 
                class="language-option"
                :class="{ 'active': getCurrentLanguage === 'ru' }"
                @click="selectLanguage('ru')"
              >
                <span class="language-flag">🇷🇺</span>
                <span class="language-name">Русский</span>
              </div>
              
              <div 
                class="language-option"
                :class="{ 'active': getCurrentLanguage === 'es' }"
                @click="selectLanguage('es')"
              >
                <span class="language-flag">🇪🇸</span>
                <span class="language-name">Español</span>
              </div>
              
              <div 
                class="language-option"
                :class="{ 'active': getCurrentLanguage === 'fr' }"
                @click="selectLanguage('fr')"
              >
                <span class="language-flag">🇫🇷</span>
                <span class="language-name">Français</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Article Font Section -->
        <div class="font-section">
          <h1 class="section-title">{{ t('settings.appearance.font') }}</h1>
          <h2 class="section-subtitle">{{ t('settings.appearance.font.subtitle') }}</h2>
          
          <button class="font-select-button">
            <p class="font-select-text">{{ t('settings.appearance.font.select') }}</p>
            <svg class="dropdown-icon" width="22" height="12" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.25 2.375L12.5 12.625L22.75 2.375" stroke="#9BA4AE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="font-preview">
            <h1 class="font-preview-text">{{ t('settings.appearance.font.preview') }}</h1>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// Импорты изображений тем
import theme1Image from '@/assets/imgs/theme3.png'
import theme2Image from '@/assets/imgs/theme2.png'
import theme3Image from '@/assets/imgs/theme1.png'
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/composables/useI18n'
import SettingsSidebar from '@/components/SettingsSidebar.vue'

// Используем composables
const { selectedTheme, selectTheme } = useTheme()
const { t, setLanguage, getCurrentLanguage, getCurrentLanguageData, initLanguage, languages } = useI18n()

// Состояние выпадающего списка
const isLanguageDropdownOpen = ref(false)

// Функция переключения выпадающего списка
const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

// Функция выбора языка
const selectLanguage = (language: string) => {
  setLanguage(language)
  isLanguageDropdownOpen.value = false
}

// Функции для получения текущего языка
const getCurrentLanguageFlag = () => {
  return getCurrentLanguageData.value?.flag || '🇺🇸'
}

const getCurrentLanguageName = () => {
  return getCurrentLanguageData.value?.name || 'English'
}

// Инициализация языка при загрузке компонента
onMounted(() => {
  initLanguage()
})

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


// Content Styles
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 12px;
    margin-bottom: 200px;
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
  margin-top: 24px; // mt-12
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

// Language Section Styles
.language-section {
  background-color: var(--bg-secondary);
  width: 980px;
  height: 200px;
  border-radius: 25px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
}

.language-dropdown {
  position: relative;
  margin-left: 48px;
  margin-top: 16px;
}

.language-select-button {
  width: 300px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  cursor: pointer;
  padding: 0 16px;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.selected-language {
  display: flex;
  align-items: center;
  gap: 12px;
}

.language-flag {
  font-size: 24px;
}

.language-name {
  color: var(--text-primary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
}

.language-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 300px;
  background-color: var(--bg-secondary);
  border-radius: 15px;
  border: 2px solid var(--text-secondary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease-in-out;

  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.language-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 13px;
  margin: 4px;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }

  &.active {
    background-color: rgba(139, 92, 246, 0.2);
    color: var(--primary-violet);
  }

  &:first-child {
    border-radius: 13px 13px 0 0;
  }

  &:last-child {
    border-radius: 0 0 13px 13px;
  }
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