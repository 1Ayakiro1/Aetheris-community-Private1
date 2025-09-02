<template>
  <div class="header-container">
    <!-- Logo and title -->
    <Logo />
    <p class="header-title">Aetheris Community</p>
    
    <!-- Navigation button -->
    <button type="button" @click="toggleNavigation" class="nav-button">
      <NavigationIcon class="nav-icon" />
      <p class="button-text">Navigation</p>
      <DropdownIcon class="dropdown-icon" />
    </button>

    <!-- Navigation panel -->
    <div v-show="showNavigation" class="dropdown-panel navigation-panel">
      <div class="panel-content">
        <router-link to="/">
          <button class="panel-button">
            <HomeIcon class="panel-icon" />
            <p class="panel-text">Start page</p>
          </button>
        </router-link>

        <router-link to="/articles">
          <button class="panel-button">
            <ArticlesIcon class="panel-icon" />
            <p class="panel-text">Articles</p>
          </button>
        </router-link>

        <router-link to="/articles/interactive">
          <button class="panel-button">
            <InteractiveIcon class="panel-icon" />
            <p class="panel-text">Interactive</p>
          </button>
        </router-link>

        <router-link to="/articles/companies">
          <button class="panel-button">
            <CompaniesIcon class="panel-icon" />
            <p class="panel-text">Companies</p>
          </button>
        </router-link>
      </div>
    </div>

    <!-- FAQ button -->
    <button type="button" @click="toggleFAQ" class="faq-button">
      <FAQIcon class="faq-icon" />
      <p class="button-text">FAQ</p>
      <DropdownIcon class="dropdown-icon" />
    </button>

    <!-- FAQ navigation panel -->
    <div v-show="showFAQ" class="dropdown-panel faq-panel">
      <div class="panel-content">
        <router-link to="/faq">
          <button class="panel-button">
            <FAQIcon class="panel-icon" />
            <p class="panel-text">FAQ page</p>
          </button>
        </router-link>

        <router-link to="/faq/help">
          <button class="panel-button">
            <HelpIcon class="panel-icon" />
            <p class="panel-text">Help</p>
          </button>
        </router-link>

        <router-link to="/faq/changes">
          <button class="panel-button">
            <ChangesIcon class="panel-icon" />
            <p class="panel-text">Site changes</p>
          </button>
        </router-link>

        <router-link to="/legal/community-rules">
          <button class="panel-button">
            <RulesIcon class="panel-icon" />
            <p class="panel-text">Forum rules</p>
          </button>
        </router-link>
      </div>
    </div>

    <!-- Additional button -->
    <button @click="toggleAdditional" class="additional-button">
      <AddIcon class="add-icon" />
      <DropdownIcon class="dropdown-icon" />
    </button>

    <!-- Additional panel -->
    <div v-show="showAdditional" class="dropdown-panel additional-panel">
      <div class="panel-content">
        <router-link to="/create-article">
          <button class="panel-button">
            <div class="icon-placeholder panel-icon"></div>
            <p class="panel-text">New article</p>
          </button>
        </router-link>
        
        <div class="panel-divider"></div>

        <button class="panel-button">
          <div class="icon-placeholder panel-icon"></div>
          <p class="panel-text">List</p>
        </button>

        <button class="panel-button">
          <div class="icon-placeholder panel-icon"></div>
          <p class="panel-text">Grid</p>
        </button>

        <button class="panel-button">
          <div class="icon-placeholder panel-icon"></div>
          <p class="panel-text">Default</p>
        </button>
      </div>
    </div>

    <!-- Profile button -->
    <button @click="toggleProfile" class="profile-button">
      <div class="profile-avatar"></div>
      <div class="icon-placeholder dropdown-icon"></div>
    </button>

    <!-- Profile panel -->
    <div v-show="showProfile" class="dropdown-panel profile-panel">
      <div class="panel-content">
        <router-link to="/profile">
          <button class="panel-button">
            <ProfileIcon class="panel-icon" />
            <p class="panel-text">Profile</p>
          </button>
        </router-link>

        <router-link to="/notifications">
          <button class="panel-button">
            <NotificationsIcon class="panel-icon" />
            <p class="panel-text">Notifications</p>
          </button>
        </router-link>

        <router-link to="/stared-articles">
          <button class="panel-button">
            <StarIcon class="panel-icon" />
            <p class="panel-text">Stared articles</p>
          </button>
        </router-link>

        <router-link to="/settings/appearance">
          <button class="panel-button">
            <SettingsIcon class="panel-icon" />
            <p class="panel-text">Settings</p>
          </button>
        </router-link>
        
        <div class="panel-divider"></div>

        <router-link to="/your-articles">
          <button class="panel-button">
            <EditIcon class="panel-icon" />
            <p class="panel-text">Your articles</p>
          </button>
        </router-link>

        <router-link to="/draft">
          <button class="panel-button">
            <DraftIcon class="panel-icon" />
            <p class="panel-text">Draft</p>
          </button>
        </router-link>

        <router-link to="/analytics">
          <button class="panel-button">
            <AnalyticsIcon class="panel-icon" />
            <p class="panel-text">Analytics</p>
          </button>
        </router-link>

        <router-link to="/settings/subscription">
          <button class="panel-button">
            <BalanceIcon class="panel-icon" />
            <p class="panel-text">Balance</p>
          </button>
        </router-link>
        
        <div class="panel-divider"></div>

        <router-link to="/settings/subscription">
          <button class="panel-button">
            <CheckmarkIcon class="panel-icon" />
            <p class="panel-text">Subscription</p>
          </button>
        </router-link>

        <router-link to="/shop">
          <button class="panel-button">
            <ShopIcon class="panel-icon" />
            <p class="panel-text">Shop</p>
          </button>
        </router-link>
        
        <div class="panel-divider"></div>

        <button class="panel-button sign-out-button">
          <SignOutIcon class="panel-icon" />
          <p class="panel-text sign-out-text">Sign out</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from './Logo.vue'
import NavigationIcon from '@/components/icons/NavigationIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import ArticlesIcon from '@/components/icons/ArticlesIcon.vue'
import InteractiveIcon from '@/components/icons/InteractiveIcon.vue'
import CompaniesIcon from '@/components/icons/CompaniesIcon.vue'
import FAQIcon from '@/components/icons/FAQIcon.vue'
import HelpIcon from '@/components/icons/HelpIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
import NotificationsIcon from '@/components/icons/NotificationsIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import DraftIcon from '@/components/icons/DraftIcon.vue'
import AnalyticsIcon from '@/components/icons/AnalyticsIcon.vue'
import BalanceIcon from '@/components/icons/BalanceIcon.vue'
import CheckmarkIcon from '@/components/icons/CheckmarkIcon.vue'
import ShopIcon from '@/components/icons/ShopIcon.vue'
import SignOutIcon from '@/components/icons/SignOutIcon.vue'
import ChangesIcon from '@/components/icons/ChangesIcon.vue'
import RulesIcon from '@/components/icons/RulesIcon.vue'

// Reactive state for dropdown panels
const showNavigation = ref(false)
const showFAQ = ref(false)
const showAdditional = ref(false)
const showProfile = ref(false)

// Toggle functions for dropdown panels
const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value
  // Close other panels when opening this one
  if (showNavigation.value) {
    showFAQ.value = false
    showAdditional.value = false
    showProfile.value = false
  }
}

const toggleFAQ = () => {
  showFAQ.value = !showFAQ.value
  // Close other panels when opening this one
  if (showFAQ.value) {
    showNavigation.value = false
    showAdditional.value = false
    showProfile.value = false
  }
}

const toggleAdditional = () => {
  showAdditional.value = !showAdditional.value
  // Close other panels when opening this one
  if (showAdditional.value) {
    showNavigation.value = false
    showFAQ.value = false
    showProfile.value = false
  }
}

const toggleProfile = () => {
  showProfile.value = !showProfile.value
  // Close other panels when opening this one
  if (showProfile.value) {
    showNavigation.value = false
    showFAQ.value = false
    showAdditional.value = false
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: var(--bg-primary);
  position: relative;
}



.header-title {
  font-family: var(--font-primary);
  font-size: 35px;
  font-weight: bold;
  margin-left: 10px;
  color: var(--text-primary);
}

// Navigation button
.nav-button {
  display: flex;
  align-items: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  width: 240px;
  height: 52px;
  margin-left: 48px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

// FAQ button
.faq-button {
  display: flex;
  align-items: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 20px;
  width: 170px;
  height: 52px;
  margin-left: 210px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

// Additional button
.additional-button {
  display: flex;
  align-items: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 20px;
  width: 128px;
  height: 52px;
  margin-left: auto;
  padding-right: 20px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

// Profile button
.profile-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 15px;
  width: 300px;
  height: 56px;
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.profile-avatar {
  background-color: var(--btn-primary);
  border-radius: 50px;
  height: 56px;
  width: 56px;
  margin-left: 12px;
}

// Button text
.button-text {
  font-family: var(--font-primary);
  font-size: 23px;
  font-weight: bold;
  color: var(--text-primary);
  margin-left: 14px;
}

// Icon positioning
.nav-icon {
  margin-left: 17px;
}

.faq-icon {
  margin-left: 16px;
}

.add-icon {
  margin-left: 12px;
}

.dropdown-icon {
  margin-left: 16px;
}

.panel-icon {
  margin-left: 16px;
}

// Dropdown panels
.dropdown-panel {
  position: absolute;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  border: 2px solid var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  z-index: 1000;
}

.navigation-panel {
  width: 240px;
  height: 280px;
  left: 695px;
  top: 380px;
}

.faq-panel {
  width: 240px;
  height: 280px;
  left: 1110px;
  top: 380px;
}

.additional-panel {
  width: 240px;
  height: 290px;
  left: 1290px;
  top: 380px;
}

.profile-panel {
  width: 270px;
  height: 777px;
  left: 1370px;
  top: 878px;
}

.panel-content {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;
}

// Panel buttons
.panel-button {
  display: flex;
  align-items: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  width: 220px;
  height: 59px;
  color: var(--text-primary);
  font-family: var(--font-primary);
  font-size: 23px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.profile-panel .panel-button {
  width: 250px;
}

.panel-text {
  font-family: var(--font-primary);
  font-size: 23px;
  font-weight: bold;
  color: var(--text-primary);
  margin-left: 16px;
}

// Panel divider
.panel-divider {
  width: 120px;
  height: 1px;
  background-color: var(--btn-primary);
  margin-left: 48px;
}

.profile-panel .panel-divider {
  width: 180px;
  margin-left: 38px;
}

// Sign out button special styling
.sign-out-button {
  .panel-text {
    color: #FF3B3B;
  }
}

.sign-out-text {
  color: #FF3B3B !important;
}

// Router link styling
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
}
</style>
