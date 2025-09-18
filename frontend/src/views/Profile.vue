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
          <img src="/src/assets/imgs/pen.png" alt="Edit" class="edit-icon" width="30" height="30">
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
  max-width: 120rem;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

/* Profile Header */
.profile-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 270px;
  margin-top: 2.5rem;
  width: 1365px;
}

/* Avatar */
.profile-avatar {
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  background-color: var(--btn-primary);
  flex-shrink: 0;
}

/* User Info */
.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 1.875rem;
  flex: 1;
}

.user-nickname {
  font-family: var(--font-sans);
  font-size: 1.875rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.user-tag {
  font-family: var(--font-sans);
  font-size: 23px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0 0 1.25rem 0;
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
  font-size: 1.5625rem;
  font-weight: 500;
  color: var(--text-third);
}

.stat-divider {
  width: 3px;
  height: 3rem;
  background-color: var(--btn-primary);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.edit-button {
  display: flex;
  align-items: center;
  width: 13.125rem;
  height: 56px;
  background-color: var(--btn-primary);
  border-radius: 1.25rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0 1rem;
}

.edit-button:hover {
  opacity: 0.9;
}

.edit-icon {
  width: 1.875rem;
  height: 1.875rem;
  color: var(--text-primary);
}

.edit-text {
  font-family: var(--font-sans);
  font-size: 1.5625rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-left: 1rem;
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
  height: 1.875rem;
  color: var(--text-primary);
}

/* Profile Divider */
.profile-divider {
  height: 2px;
  width: 1360px;
  background-color: var(--btn-primary);
  margin-left: 270px;
  margin-top: 1.25rem;
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12.5rem 0 20.625rem 0;
}

.empty-message {
  font-family: var(--font-sans);
  font-size: 1.5625rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}
</style>