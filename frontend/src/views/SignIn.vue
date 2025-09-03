<template>
  <div class="signin-container">
    <div class="signin-card">
      <div class="signin-header">
        <h1 class="signin-title">Join Aetheris</h1>
        <p class="signin-subtitle">Create your account to get started</p>
      </div>
      
      <form class="signin-form">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" placeholder="Choose a username">
        </div>
        
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" placeholder="Enter your email">
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" placeholder="Create a password">
        </div>
        
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input type="password" class="form-input" placeholder="Confirm your password">
        </div>
        
        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" class="checkbox">
            <span class="checkbox-text">I agree to the <a href="#" class="terms-link">Terms of Service</a></span>
          </label>
        </div>
        
        <button type="submit" class="signin-button">
          Create Account
        </button>
      </form>
      
      <div class="signin-footer">
        <p class="login-text">
          Already have an account? 
          <router-link to="/login" class="login-link">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.signin-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.signin-card {
  background-color: var(--bg-secondary);
  border-radius: 20px;
  padding: 48px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--text-secondary);
}

.signin-header {
  text-align: center;
  margin-bottom: 32px;
}

.signin-title {
  font-family: var(--font-sans);
  font-size: 32px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.signin-subtitle {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

.signin-form {
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
  justify-content: flex-start;
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

.terms-link {
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.terms-link:hover {
  color: var(--text-primary);
}

.signin-button {
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

.signin-button:hover {
  opacity: 0.9;
}

.signin-footer {
  text-align: center;
  margin-top: 24px;
}

.login-text {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

.login-link {
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.login-link:hover {
  color: var(--text-primary);
}
</style>