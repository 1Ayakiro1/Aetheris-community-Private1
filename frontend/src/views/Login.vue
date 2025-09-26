<template>
  <div class="login-container">
    
    <!-- Main Body -->
    <div class="main-body">
      <div class="login-content">
        <h2 class="login-title">Log in</h2>
        <div class="login-form">
          <h2 class="field-label">Nickname/mail</h2>
          <input 
            id="nickname" 
            v-model="nickname"
            type="text" 
            placeholder="Enter your nickname/mail" 
            class="input-field"
            :class="{ 'error': nicknameError }"
          >
          <p v-if="nicknameError" class="error-message">Nickname is invalid</p>
          
          <h2 class="field-label">Password</h2>
          <input 
            id="password" 
            v-model="password"
            type="password" 
            placeholder="Enter your password" 
            class="input-field"
            :class="{ 'error': passwordError }"
          >
          <p v-if="passwordError" class="error-message">Password is invalid</p>
          
          <!-- API Error Display -->
          <div v-if="error" class="api-error">
            <p class="api-error-message">{{ error }}</p>
          </div>
          
          <p class="forgot-password">Forgot password?</p>
          <p class="sign-in-link">Or <router-link to="/signin" class="link">sign in</router-link></p>
          
          <button @click="handleLogin" class="login-button" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            <span v-if="!loading">Log in</span>
            <span v-else>Logging in...</span>
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import type { LoginCredentials } from '../types/user'

const { login, loading, error, clearError } = useAuth()

const nickname = ref('')
const password = ref('')
const rememberMe = ref(false)
const nicknameError = ref(false)
const passwordError = ref(false)

const validateNickname = (value: string): boolean => {
  return value.length >= 3 && value.length <= 50
}

const validatePassword = (value: string): boolean => {
  return value.length >= 6
}

const handleLogin = async () => {
  clearError()
  
  const nicknameValid = validateNickname(nickname.value)
  const passwordValid = validatePassword(password.value)
  
  nicknameError.value = !nicknameValid
  passwordError.value = !passwordValid
  
  if (nicknameValid && passwordValid) {
    try {
      const credentials: LoginCredentials = {
        login: nickname.value,
        password: password.value,
        rememberMe: rememberMe.value
      }
      
      await login(credentials)
      // При успехе пользователь будет перенаправлен автоматически
    } catch (err) {
      // Ошибка уже обработана в useAuth
      console.error('Login failed:', err)
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 0 16px;
  box-sizing: border-box;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 0 12px;
  }
  
  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 20px;
    max-width: 800px;
  }
  
  /* Десктоп */
  @media (min-width: 1025px) {
    padding: 0 24px;
    max-width: 1200px;
  }
}

.main-body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 30px 0;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-weight: bold;
  text-align: center;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 8px;
  }
  
  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 44px;
    margin-bottom: 9px;
  }
  
  /* Десктоп */
  @media (min-width: 1025px) {
    font-size: 50px;
    margin-bottom: 10px;
  }
}

.login-form {
  width: 600px;
  height: 470px;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 32px 48px;
}

.field-label {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
}

.input-field {
  width: 500px;
  height: 68px;
  background-color: var(--btn-primary);
  border-radius: 15px;
  border: none;
  font-weight: bold;
  padding: 0 16px;
  font-size: 22px;
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
  font-size: 14px;
  font-family: var(--font-sans);
  margin-top: 4px;
  margin-bottom: 0;
}

.forgot-password {
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 16px;
  text-align: center;
}

.sign-in-link {
  color: var(--text-primary);
  font-size: 16px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 16px;
  text-align: center;
}

.link {
  color: var(--btn-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.login-button {
  width: 269px;
  height: 56px;
  background-color: var(--btn-primary);
  border-radius: 15px;
  border: none;
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin: 16px auto 0;
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
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.api-error {
  margin: 16px 0;
  padding: 12px;
  background-color: rgba(255, 59, 59, 0.1);
  border: 1px solid #FF3B3B;
  border-radius: 8px;
}

.api-error-message {
  color: #FF3B3B;
  font-size: 14px;
  font-family: var(--font-sans);
  margin: 0;
  text-align: center;
}
</style>