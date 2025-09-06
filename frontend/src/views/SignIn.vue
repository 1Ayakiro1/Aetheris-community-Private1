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
            :class="{ 'error': nicknameError }"
          >
          <p v-if="nicknameError" class="error-message">Nickname is invalid</p>
          
          <h2 class="field-label">Mail</h2>
          <input 
            id="email" 
            v-model="email"
            type="email" 
            placeholder="Enter your mail" 
            class="input-field"
            :class="{ 'error': emailError }"
          >
          <p v-if="emailError" class="error-message">Email must contain @</p>
          
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
          
          <p class="login-link">Or <router-link to="/login" class="link">log in</router-link></p>
          
          <button @click="handleSignIn" class="signin-button">Sign in</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nickname = ref('')
const email = ref('')
const password = ref('')
const nicknameError = ref(false)
const emailError = ref(false)
const passwordError = ref(false)

const validateNickname = (value: string): boolean => {
  return value.length >= 3 && value.length <= 20
}

const validateEmail = (value: string): boolean => {
  return value.includes('@') && value.length > 5
}

const validatePassword = (value: string): boolean => {
  return value.length >= 6
}

const handleSignIn = () => {
  const nicknameValid = validateNickname(nickname.value)
  const emailValid = validateEmail(email.value.trim())
  const passwordValid = validatePassword(password.value)
  
  nicknameError.value = !nicknameValid
  emailError.value = !emailValid
  passwordError.value = !passwordValid
  
  if (nicknameValid && emailValid && passwordValid) {
    // Stub: send to backend
    console.log('Sign up payload', {
      nickname: nickname.value,
      email: email.value,
      password: '[REDACTED]'
    })
    alert('Sign in request sent (stub). Hook this to your API.')
  }
}
</script>

<style scoped lang="scss">
.signin-container {
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

.signin-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signin-title {
  color: var(--text-primary);
  font-size: 50px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-bottom: 10px;
}

.signin-form {
  width: 600px;
  height: 583px;
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

.login-link {
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

.signin-button {
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