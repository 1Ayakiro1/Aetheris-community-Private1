<template>
    <div class="profile-container">
        <!-- Profile Header Section -->
        <div class="profile-header">
            <!-- Avatar -->
            <div class="profile-avatar"></div>

            <!-- User Info -->
            <div class="user-info">
                <h1 class="user-nickname">
                    {{ auth.user?.username || "Гость" }}
                </h1>

                <p class="user-tag">
                    {{ auth.user ? "#" + auth.user.id : "#0000" }}
                </p>

                <!-- User Stats -->
                <div class="user-stats">
                    <span class="stat-item">N {{ $t('profile_page.title1') }}</span>
                    <div class="stat-divider"></div>
                    <span class="stat-item">N {{ $t('profile_page.title2') }}</span>
                    <div class="stat-divider"></div>
                    <span class="stat-item">{{ $t('profile_page.title3') }} {{ joinDate }}</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons" v-if="auth.isAuthenticated">
                <button class="edit-button" @click="goToSettings">
                    <img src="/src/assets/imgs/pen.png" alt="Edit" class="edit-icon" width="30" height="30">
                </button>

                <button class="more-button" @click="toggleOptionsMenu">
                    <svg class="more-icon" width="6" height="30" viewBox="0 0 6 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="6" r="2" fill="currentColor"/>
                        <circle cx="3" cy="15" r="2" fill="currentColor"/>
                        <circle cx="3" cy="24" r="2" fill="currentColor"/>
                    </svg>
                    
                    <!-- Dropdown Menu -->
                    <Transition name="dropdown-fade">
                        <div v-if="showOptionsMenu" class="options-dropdown" @click.stop>
                            <button class="dropdown-item" @click="copyUserId">
                                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15 9H9C8.44772 9 8 9.44772 8 10V16C8 16.5523 8.44772 17 9 17H15C15.5523 17 16 16.5523 16 16V10C16 9.44772 15.5523 9 15 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Copy ID</span>
                            </button>
                            
                            <button class="dropdown-item" @click="copyProfileLink">
                                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 13a5 5 0 0 1 7.07 0l1.41 1.41a5 5 0 0 1 0 7.07v0a5 5 0 0 1-7.07 0l-1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14 11a5 5 0 0 1-7.07 0L5.5 9.57a5 5 0 0 1 0-7.07v0a5 5 0 0 1 7.07 0L14 3.91" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Copy Link</span>
                            </button>
                        </div>
                    </Transition>
                </button>
            </div>
        </div>

        <!-- Divider Line -->
        <div class="profile-divider"></div>

        <!-- Content Section -->
        <div class="profile-content">
            <p v-if="!auth.isAuthenticated" class="empty-message">
                {{ $t('common.not_registered') }}
            </p>
            <p v-else class="empty-message">
                {{ $t('common.no_articles') }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth"
import { useI18n } from 'vue-i18n'

const router = useRouter()
const auth = useAuthStore()

const joinDate = "2025-09-29"

const { t } = useI18n()

// Dropdown state
const showOptionsMenu = ref(false)

const goToSettings = () => {
  router.push('/settings/profile')
}

const toggleOptionsMenu = () => {
  showOptionsMenu.value = !showOptionsMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.action-buttons')) {
    showOptionsMenu.value = false
  }
}

const copyUserId = async () => {
  try {
    const userId = auth.user?.id || '0000'
    await navigator.clipboard.writeText(userId.toString())
    showOptionsMenu.value = false
    // Можно добавить уведомление об успешном копировании
    console.log('User ID copied to clipboard:', userId)
  } catch (err) {
    console.error('Failed to copy user ID:', err)
  }
}

const copyProfileLink = async () => {
  try {
    const profileUrl = `${window.location.origin}/profile`
    await navigator.clipboard.writeText(profileUrl)
    showOptionsMenu.value = false
    // Можно добавить уведомление об успешном копировании
    console.log('Profile link copied to clipboard:', profileUrl)
  } catch (err) {
    console.error('Failed to copy profile link:', err)
  }
}

onMounted(async () => {
  if (!auth.user && auth.token) {
    try { await auth.fetchMe() } catch {}
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<style scoped>
.profile-container {
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
    max-width: 1000px;
  }

  /* Десктоп */
  @media (min-width: 1025px) {
    padding: 0 24px;
    max-width: 1400px;
  }
}

/* Profile Header */
.profile-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 40px;
  width: 1365px;
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
  width: 60px;
  height: 56px;
  background-color: transparent;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.edit-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
}

.edit-icon {
  width: 30px;
  height: 30px;
  margin-left: 15px;
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
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    background-color: var(--btn-primary);
    transition: all 0.3s ease-in-out;
  }
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
  width: 1360px;
  background-color: var(--btn-primary);
  margin-top: 20px;
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

/* Dropdown Styles */
.options-dropdown {
  position: absolute;
  top: 90px;
  right: 5px;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  padding: 12px;
  min-width: 312px; /* 260px * 1.2 = 312px */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 14px; /* 12px * 1.2 = 14.4px ≈ 14px */
  width: 100%;
  padding: 14px 19px; /* 12px * 1.2 = 14.4px ≈ 14px, 16px * 1.2 = 19.2px ≈ 19px */
  background: none;
  border: none;
  border-radius: 14px; /* 12px * 1.2 = 14.4px ≈ 14px */
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 19px; /* 16px * 1.2 = 19.2px ≈ 19px */
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: var(--btn-primary);
  }
}

/* Dropdown Animation */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
