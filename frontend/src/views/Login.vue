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

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  color: var(--text-primary);
  font-size: 3.125rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 0.625rem;
}

.login-form {
  width: 37.5rem;
  height: 29.375rem;
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

.forgot-password {
  color: var(--text-primary);
  font-size: 1rem;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}

.sign-in-link {
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

.login-button {
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