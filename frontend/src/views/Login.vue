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
          
          <p class="forgot-password">Forgot password?</p>
          <p class="sign-in-link">Or <router-link to="/signin" class="link">sign in</router-link></p>
          
          <button @click="handleLogin" class="login-button">Log in</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nickname = ref('')
const password = ref('')
const nicknameError = ref(false)
const passwordError = ref(false)

const validateNickname = (value: string): boolean => {
  return value.length >= 3 && value.length <= 20
}

const validatePassword = (value: string): boolean => {
  return value.length >= 6
}

const handleLogin = () => {
  const nicknameValid = validateNickname(nickname.value)
  const passwordValid = validatePassword(password.value)
  
  nicknameError.value = !nicknameValid
  passwordError.value = !passwordValid
  
  if (nicknameValid && passwordValid) {
    // Stub: send to backend
    console.log('Login payload', {
      nickname: nickname.value,
      password: '[REDACTED]'
    })
    alert('Login request sent (stub). Hook this to your API.')
  }
}
</script>

<style scoped lang="scss">
.login-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
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
  font-size: 50px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 10px;
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
  
  &:hover {
    opacity: 0.8;
  }
}
</style>