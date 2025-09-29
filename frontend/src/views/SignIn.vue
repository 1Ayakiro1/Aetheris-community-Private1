<template>
    <div class="signin-container">
        <div class="main-body">
            <div class="signin-content">
                <h2 class="signin-title">Sign in</h2>
                <div class="signin-form">
                    <h2 class="field-label">Username</h2>
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Enter your username"
                        class="input-field"
                    >

                    <h2 class="field-label">Password</h2>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Enter your password"
                        class="input-field"
                    >

                    <div v-if="error" class="api-error">
                        <p>{{ error }}</p>
                    </div>

                    <button @click="handleSignIn" class="signin-button" :disabled="loading">
                        <span v-if="loading">Signing in...</span>
                        <span v-else>Sign in</span>
                    </button>

                    <p class="login-link">Or <router-link to="/login" class="link">log in</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { register, loading, error, clearError } = useAuth()

const username = ref('')
const password = ref('')

const handleSignIn = async () => {
    clearError()
    if (!username.value || !password.value) return
    try {
        await register(username.value, password.value)
        router.push('/login')
    } catch (err) {
        console.error(err)
    }
}
</script>


<style scoped lang="scss">
.signin-container {
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
