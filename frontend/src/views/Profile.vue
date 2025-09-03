<template>
  <div class="profile-container">
    <!-- Profile Header Section -->
    <div class="profile-header">
      <!-- Avatar -->
      <div class="profile-avatar"></div>
      
      <!-- User Info -->
      <div class="user-info">
        <h1 class="user-nickname">Nickname</h1>
        <p class="user-tag">#UserTag</p>
        
        <!-- User Stats -->
        <div class="user-stats">
          <span class="stat-item">N articles</span>
          <div class="stat-divider"></div>
          <span class="stat-item">N comments</span>
          <div class="stat-divider"></div>
          <span class="stat-item">Joined ddmmyy</span>
          <div class="stat-divider"></div>
          <span class="stat-item">Rank</span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="edit-button">
          <svg class="edit-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 7.5L25 5L27.5 7.5L25 10L22.5 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 10L25 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 25L20 10L25 15L10 30L5 25Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="edit-text">Edit</span>
        </button>
        
        <button class="more-button">
          <svg class="more-icon" width="6" height="30" viewBox="0 0 6 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="6" r="2" fill="currentColor"/>
            <circle cx="3" cy="15" r="2" fill="currentColor"/>
            <circle cx="3" cy="24" r="2" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Divider Line -->
    <div class="profile-divider"></div>
    
    <!-- Content Section -->
    <div class="profile-content">
      <p class="empty-message">The user has not created any articles yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.profile-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

/* Profile Header */
.profile-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 180px;
  margin-top: 40px;
}

/* Avatar */
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--btn-primary);
  flex-shrink: 0;
}

/* User Info */
.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  flex: 1;
}

.user-nickname {
  font-family: var(--font-sans);
  font-size: 30px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.user-tag {
  font-family: var(--font-sans);
  font-size: 23px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0 0 20px 0;
}

/* User Stats */
.user-stats {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.stat-item {
  font-family: var(--font-sans);
  font-size: 25px;
  font-weight: 500;
  color: var(--text-third);
}

.stat-divider {
  width: 3px;
  height: 48px;
  background-color: var(--btn-primary);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
}

.edit-button {
  display: flex;
  align-items: center;
  width: 150px;
  height: 56px;
  background-color: var(--btn-primary);
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0 16px;
}

.edit-button:hover {
  opacity: 0.9;
}

.edit-icon {
  width: 30px;
  height: 30px;
  color: var(--text-primary);
}

.edit-text {
  font-family: var(--font-sans);
  font-size: 25px;
  font-weight: 500;
  color: var(--text-primary);
  margin-left: 16px;
}

.more-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: var(--btn-primary);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.more-button:hover {
  opacity: 0.9;
}

.more-icon {
  width: 6px;
  height: 30px;
  color: var(--text-primary);
}

/* Profile Divider */
.profile-divider {
  height: 2px;
  width: 1400px;
  background-color: var(--btn-primary);
  margin: 8px auto 0 180px;
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 200px 0 210px 0;
}

.empty-message {
  font-family: var(--font-sans);
  font-size: 25px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}
</style>