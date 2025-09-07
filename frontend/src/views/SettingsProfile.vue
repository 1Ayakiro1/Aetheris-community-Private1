<template>
  <div class="settings-profile-container">
    <AppHeader />
    
    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <SettingsSidebar />
      
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
              <svg class="reset-icon" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.20831 3.02937V10.7742M1.20831 10.7742H8.45831M1.20831 10.7742L6.81498 5.14629C8.48358 3.36681 10.6484 2.21484 12.9831 1.86393C15.3179 1.51302 17.6962 1.98219 19.7597 3.20074C21.8231 4.4193 23.46 6.32123 24.4236 8.61996C25.3872 10.9187 25.6253 13.4897 25.1022 15.9456C24.579 18.4015 23.3228 20.6092 21.523 22.2362C19.7231 23.8631 17.477 24.8211 15.1231 24.9659C12.7693 25.1106 10.4351 24.4342 8.4724 23.0386C6.50968 21.643 5.02471 19.6038 4.24123 17.2282" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
            :class="{ 'error': nicknameError }"
            v-model="nickname"
          />
          <p v-if="nicknameError" class="error-message">{{ nicknameError }}</p>
          
          <!-- Bio Section -->
          <div class="bio-section">
            <h1 class="section-title">Bio</h1>
            <h2 class="section-subtitle">Add information about you and your hobbies and skills</h2>
            <textarea 
              placeholder="Enter your bio" 
              class="bio-input"
              :class="{ 'error': bioError }"
              v-model="bio"
            ></textarea>
            <p v-if="bioError" class="error-message">{{ bioError }}</p>
            <p class="character-count">{{ bio.length }}/300</p>
          </div>
        </div>
      </div>
    </div>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'

const nickname = ref('')
const bio = ref('')

// Состояния ошибок валидации
const nicknameError = ref('')
const bioError = ref('')

// Валидация никнейма
const validateNickname = (value: string): string => {
  if (!value.trim()) {
    return 'Nickname is required'
  }
  
  if (value.length > 50) {
    return 'Nickname must be no more than 50 characters'
  }
  
  // Разрешенные символы: базовая латиница и кириллица
  const allowedPattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/
  if (!allowedPattern.test(value)) {
    return 'Nickname can only contain Latin letters, Cyrillic letters and spaces'
  }
  
  return ''
}

// Валидация описания
const validateBio = (value: string): string => {
  if (value.length > 300) {
    return 'Bio must be no more than 300 characters'
  }
  
  return ''
}


// Валидация в реальном времени
watch(nickname, (newValue) => {
  // Убираем недопустимые символы, но не обрезаем по длине
  const sanitized = newValue.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
  if (sanitized !== newValue) {
    nickname.value = sanitized
  }
  nicknameError.value = validateNickname(nickname.value)
})

watch(bio, (newValue) => {
  // Не обрезаем текст автоматически, только показываем ошибку
  bioError.value = validateBio(newValue)
})
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
  
  &.error {
    border: 2px solid #FF3B3B;
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
  
  &.error {
    border: 2px solid #FF3B3B;
  }
}

.error-message {
  color: #FF3B3B;
  font-size: 14px;
  font-family: var(--font-sans);
  margin-top: 4px;
  margin-left: 48px;
  margin-bottom: 0;
}

.character-count {
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-sans);
  margin-top: 4px;
  margin-left: 48px;
  margin-bottom: 0;
}

.bio-section {
  // Секция без дополнительных стилей
}
</style>