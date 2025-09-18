<template>
  <div class="notifications-container">
    <!-- Notifications Header -->
    <div class="notifications-header">
      <h1 class="notifications-title">Notifications</h1>
      <p class="notifications-subtitle">Stay updated with community activities</p>
    </div>
    
    <!-- Notifications Content -->
    <div class="notifications-content">
      <div class="notifications-list">
        <!-- Sample notifications -->
        <div class="notification-item">
          <div class="notification-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="notification-content">
            <h3 class="notification-title">New Article Published</h3>
            <p class="notification-description">A new article "Getting Started with Vue.js" has been published in the Articles section.</p>
            <span class="notification-time">2 hours ago</span>
          </div>
        </div>
        
        <div class="notification-item">
          <div class="notification-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="notification-content">
            <h3 class="notification-title">Comment on Your Article</h3>
            <p class="notification-description">John Doe commented on your article "Advanced React Patterns".</p>
            <span class="notification-time">5 hours ago</span>
          </div>
        </div>
        
        <div class="notification-item">
          <div class="notification-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="notification-content">
            <h3 class="notification-title">System Update</h3>
            <p class="notification-description">Aetheris Community has been updated with new features and improvements.</p>
            <span class="notification-time">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.notifications-container {
  max-width: 120rem;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
  padding: 2.5rem 15rem;
}

/* Notifications Header */
.notifications-header {
  margin-bottom: 2.5rem;
}

.notifications-title {
  font-family: var(--font-sans);
  font-size: 3rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.notifications-subtitle {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

/* Notifications Content */
.notifications-content {
  width: 100%;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid var(--text-secondary);
  transition: all 0.3s ease-in-out;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.25rem 12px rgba(0, 0, 0, 0.1);
}

.notification-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--primary-blue);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.notification-title {
  font-family: var(--font-sans);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.notification-description {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.notification-time {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-third);
}
</style>