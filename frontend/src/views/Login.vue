<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Sign in to your account</p>
      </div>
      
      <form class="login-form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" placeholder="Enter your email">
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" placeholder="Enter your password">
        </div>
        
        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" class="checkbox">
            <span class="checkbox-text">Remember me</span>
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>
        
        <button type="submit" class="login-button">
          Sign In
        </button>
      </form>
      
      <div class="login-footer">
        <p class="signup-text">
          Don't have an account? 
          <router-link to="/signin" class="signup-link">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.login-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-card {
  background-color: var(--bg-secondary);
  border-radius: 20px;
  padding: 48px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--text-secondary);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-family: var(--font-sans);
  font-size: 32px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.login-subtitle {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input {
  padding: 12px 16px;
  border: 1px solid var(--text-secondary);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
}

.form-input::placeholder {
  color: var(--text-third);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--primary-blue);
}

.checkbox-text {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.forgot-link {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.forgot-link:hover {
  color: var(--text-primary);
}

.login-button {
  width: 100%;
  padding: 16px;
  background-color: var(--primary-blue);
  color: var(--text-primary);
  border: none;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.login-button:hover {
  opacity: 0.9;
}

.login-footer {
  text-align: center;
  margin-top: 24px;
}

.signup-text {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

.signup-link {
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.signup-link:hover {
  color: var(--text-primary);
}
</style>