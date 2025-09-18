<template>
  <div class="signin-container">
    
    <!-- Main Body -->
    <div class="main-body">
      <div class="signin-content">
        <h2 class="signin-title">Sign in</h2>
        <div class="signin-form">
          <h2 class="field-label">Nickname</h2>
          <input 
            id="nickname" 
            v-model="nickname"
            type="text" 
            placeholder="Enter your nickname" 
            class="input-field"
            :class="{ 'error': !nicknameError.isValid }"
            maxlength="24"
          >
          <p v-if="!nicknameError.isValid" class="error-message">{{ nicknameError.message }}</p>
          
          <h2 class="field-label">Mail</h2>
          <input 
            id="email" 
            v-model="email"
            type="email" 
            placeholder="Enter your mail" 
            class="input-field"
            :class="{ 'error': !emailError.isValid }"
            maxlength="254"
          >
          <p v-if="!emailError.isValid" class="error-message">{{ emailError.message }}</p>
          
          <h2 class="field-label">Password</h2>
          <input 
            id="password" 
            v-model="password"
            type="password" 
            placeholder="Enter your password" 
            class="input-field"
            :class="{ 'error': !passwordError.isValid }"
            maxlength="48"
          >
          <p v-if="!passwordError.isValid" class="error-message">{{ passwordError.message }}</p>
          
          <!-- API Error Display -->
          <div v-if="error" class="api-error">
            <p class="api-error-message">{{ error }}</p>
          </div>
          
          <p class="login-link">Or <router-link to="/login" class="link">log in</router-link></p>
          
          <button @click="handleSignIn" class="signin-button" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            <span v-if="!loading">Sign in</span>
            <span v-else>Signing in...</span>
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useValidation, type ValidationResult } from '../composables/useValidation'
import { useAuth } from '../composables/useAuth'
import type { RegisterData } from '../types/user'

const { sanitizeNickname, sanitizePassword, validateNickname, validatePassword, validateEmail } = useValidation()
const { register, loading, error, clearError } = useAuth()

// Реактивные данные формы
const nickname = ref('')
const email = ref('')
const password = ref('')

// Состояния ошибок валидации
const nicknameError = ref<ValidationResult>({ isValid: true, message: '' })
const emailError = ref<ValidationResult>({ isValid: true, message: '' })
const passwordError = ref<ValidationResult>({ isValid: true, message: '' })

// Валидация в реальном времени
watch(nickname, (newValue) => {
  const sanitized = sanitizeNickname(newValue)
  if (sanitized !== newValue) {
    nickname.value = sanitized
  }
  nicknameError.value = validateNickname(nickname.value)
})

watch(email, (newValue) => {
  emailError.value = validateEmail(newValue)
})

watch(password, (newValue) => {
  const sanitized = sanitizePassword(newValue)
  if (sanitized !== newValue) {
    password.value = sanitized
  }
  passwordError.value = validatePassword(password.value)
})

const handleSignIn = async () => {
  clearError()
  
  // Финальная валидация всех полей
  const nicknameValidation = validateNickname(nickname.value)
  const emailValidation = validateEmail(email.value)
  const passwordValidation = validatePassword(password.value)
  
  nicknameError.value = nicknameValidation
  emailError.value = emailValidation
  passwordError.value = passwordValidation
  
  // Проверяем, что все поля валидны
  const isFormValid = nicknameValidation.isValid && 
                     emailValidation.isValid && 
                     passwordValidation.isValid
  
  if (isFormValid) {
    try {
      const userData: RegisterData = {
        nickname: nickname.value,
        email: email.value,
        password: password.value,
        confirmPassword: password.value, // В простой форме используем тот же пароль
        agreeToTerms: true, // Предполагаем согласие
        agreeToPrivacy: true
      }
      
      await register(userData)
      // При успехе пользователь будет перенаправлен автоматически
    } catch (err) {
      // Ошибка уже обработана в useAuth
      console.error('Registration failed:', err)
    }
  } else {
    console.log('Form validation failed')
  }
}
</script>

<style scoped lang="scss">
.signin-container {
  max-width: 120rem;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.main-body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 12.5rem);
  padding: 1.875rem 0;
}

.signin-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signin-title {
  color: var(--text-primary);
  font-size: 3.125rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 0.625rem;
}

.signin-form {
  width: 37.5rem;
  height: 583px;
  background-color: var(--bg-secondary);
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
}

.field-label {
  color: var(--text-primary);
  font-size: 1.5625rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.input-field {
  width: 31.25rem;
  height: 68px;
  background-color: var(--btn-primary);
  border-radius: 0.9375rem;
  border: none;
  font-weight: bold;
  padding: 0 1rem;
  font-size: 1.375rem;
  color: var(--text-primary);
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &.error {
    border: 2px solid #FF3B3B;
  }
}

.error-message {
  color: #FF3B3B;
  font-size: 0.875rem;
  font-family: var(--font-sans);
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.login-link {
  color: var(--text-primary);
  font-size: 1rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}

.link {
  color: var(--btn-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.signin-button {
  width: 269px;
  height: 56px;
  background-color: var(--btn-primary);
  border-radius: 0.9375rem;
  border: none;
  color: var(--text-primary);
  font-size: 1.5625rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 1rem auto 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover:not(:disabled) {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.api-error {
  margin: 1rem 0;
  padding: 12px;
  background-color: rgba(255, 59, 59, 0.1);
  border: 1px solid #FF3B3B;
  border-radius: 0.5rem;
}

.api-error-message {
  color: #FF3B3B;
  font-size: 0.875rem;
  font-family: var(--font-sans);
  margin: 0;
  text-align: center;
}
</style>