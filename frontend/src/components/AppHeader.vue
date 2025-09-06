<template>
  <div class="header-container">
    <!-- Logo and title -->
    <router-link to="/" class="header-brand-link">
      <Logo class="logo" />
      <p class="header-title">Aetheris Community</p>
    </router-link>
    
    <!-- Navigation button -->
            <button type="button" id="nav-btn" class="nav-button">
          <NavigationIcon class="nav-icon" />
          <p class="button-text">Navigation</p>
          <DropdownIcon class="dropdown-icon nav-arrow" />
        </button>

    <!-- Navigation panel -->
    <div id="navigation_panel" class="dropdown-panel navigation-panel hidden opacity-0 pointer-events-none">
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
    <button type="button" id="faq-btn" class="faq-button">
      <FAQIcon class="faq-icon" />
      <p class="button-text">FAQ</p>
      <DropdownIcon class="dropdown-icon faq-arrow" />
    </button>

    <!-- FAQ navigation panel -->
    <div id="faq_navigation_panel" class="dropdown-panel faq-panel hidden opacity-0 pointer-events-none">
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
    <button id="add-btn" class="additional-button">
      <AddIcon class="add-icon" />
      <DropdownIcon class="dropdown-icon additional-arrow" />
    </button>

    <!-- Additional panel -->
    <div id="additional_panel" class="dropdown-panel additional-panel hidden opacity-0 pointer-events-none">
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
    <button id="logo-btn" class="profile-button">
      <div class="profile-avatar"></div>
      <DropdownIcon class="dropdown-icon profile-arrow" />
    </button>

    <!-- Profile panel -->
    <div id="profile_panel" class="dropdown-panel profile-panel hidden opacity-0 pointer-events-none">
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
import { onMounted, onUnmounted } from 'vue'
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

// Type definitions
interface PanelElement {
  panel: HTMLElement | null
  button: HTMLElement | null
}

interface PanelsConfig {
  nav: PanelElement
  faq: PanelElement
  add: PanelElement
  prof: PanelElement
}

// Panel configuration
const panels: PanelsConfig = {
  nav: {
    panel: null,
    button: null,
  },
  faq: {
    panel: null,
    button: null,
  },
  add: {
    panel: null,
    button: null,
  },
  prof: {
    panel: null,
    button: null,
  },
}

// Universal functions
function showPanel(panel: HTMLElement): void {
  // Close all other panels
  Object.values(panels).forEach(({ panel: p, button: b }) => {
    if (p && p !== panel) {
      hidePanel(p)
      if (b) b.classList.remove('active')
    }
  })

  panel.classList.remove('hidden')

  // Add active class to corresponding button
  const button = Object.values(panels).find(({ panel: p }) => p === panel)?.button
  if (button) button.classList.add('active')

  // First frame - just show
  requestAnimationFrame(() => {
    // Second frame - apply smooth animation
    requestAnimationFrame(() => {
      panel.classList.remove('opacity-0', 'pointer-events-none')
      panel.classList.add('opacity-100')
    })
  })
}

function hidePanel(panel: HTMLElement): void {
  panel.classList.remove('opacity-100')
  panel.classList.add('opacity-0', 'pointer-events-none')

  // Remove active class from corresponding button
  const button = Object.values(panels).find(({ panel: p }) => p === panel)?.button
  if (button) button.classList.remove('active')

  const handler = (): void => {
    if (panel.classList.contains('opacity-0')) {
      panel.classList.add('hidden')
    }
    panel.removeEventListener('transitionend', handler)
  }
  panel.addEventListener('transitionend', handler)
}

// Initialize panels and add event listeners
onMounted(() => {
  // Get panel elements
  panels.nav.panel = document.getElementById('navigation_panel')
  panels.nav.button = document.getElementById('nav-btn')
  panels.faq.panel = document.getElementById('faq_navigation_panel')
  panels.faq.button = document.getElementById('faq-btn')
  panels.add.panel = document.getElementById('additional_panel')
  panels.add.button = document.getElementById('add-btn')
  panels.prof.panel = document.getElementById('profile_panel')
  panels.prof.button = document.getElementById('logo-btn')

  // Add click handlers to buttons
  Object.values(panels).forEach(({ panel, button }) => {
    if (panel && button) {
      button.addEventListener('click', (e: Event) => {
        if (panel.classList.contains('hidden')) {
          showPanel(panel)
        } else {
          hidePanel(panel)
        }
        e.stopPropagation()
      })
    }
  })

  // Global click handler for closing panels
  document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement
    Object.values(panels).forEach(({ panel, button }) => {
      if (panel && button) {
        if (!panel.contains(target) && !button.contains(target)) {
          if (!panel.classList.contains('hidden')) {
            hidePanel(panel)
          }
        }
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.header-brand-link {
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  margin-left: 245px;
  
  &:hover {
    opacity: 0.8;
  }
}

.logo {
  margin: 0;
}

.header-title {
  font-family: 'Comfortaa', sans-serif;
  font-size: 35px;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
  margin-left: 10px;
  white-space: nowrap;
}

.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: var(--bg-primary);
  position: relative;
  margin-top: 20px;
}

// Navigation button
.nav-button {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  width: 260px;
  height: 52px;
  margin-left: 40px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

// FAQ button
.faq-button {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 20px;
  width: 180px;
  height: 52px;
  margin-left: 200px;
  margin-right: 20px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

// Additional button
.additional-button {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 20px;
  width: 105px;
  margin-right: 20px;
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
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 15px;
  width: 100px;
  height: 56px;
  margin-right: 275px;
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.profile-avatar {
  background-color: var(--btn-primary);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  flex-shrink: 0;
  margin-left: 12px;
}

// Dropdown icons rotation
.dropdown-icon {
  color: var(--text-primary);
  transition: transform 0.3s ease-in-out;
  margin-left: 16px;
}

// Navigation arrow special spacing
.nav-arrow {
  margin-right: 20px;
}

// FAQ arrow spacing
.faq-arrow {
  margin-left: 10px;
  margin-right: 12px;
}

// Additional arrow spacing
.additional-arrow {
  margin-left: 10px;
}

// Profile arrow spacing
.profile-arrow {
  margin-left: 10px;
  margin-right: 12px;
}

// Active state for dropdown icons (when panel is open)
.nav-button.active .dropdown-icon,
.faq-button.active .dropdown-icon,
.additional-button.active .dropdown-icon,
.profile-button.active .dropdown-icon {
  transform: rotate(180deg);
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


.panel-icon {
  margin-left: 16px;
  margin-right: 12px;
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
  z-index: 1000;
  min-width: 200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s ease-in-out;
}

// Animation classes
.hidden {
  display: none !important;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

.pointer-events-none {
  pointer-events: none;
}

.navigation-panel {
  width: 260px;
  height: 280px;
  left: 785px;
  top: 100px;
}

.faq-panel {
  width: 260px;
  height: 280px;
  left: 1200px;
  top: 100px;
}

.additional-panel {
  width: 260px;
  height: 290px;
  left: 1345px;
  top: 100px;
}

.profile-panel {
  width: 290px;
  height: 777px;
  left: 1460px;
  top: 100px;
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
  width: 240px;
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
  width: 270px;
}

.panel-text {
  font-family: var(--font-primary);
  font-size: 23px;
  font-weight: bold;
  color: var(--text-primary);
  margin-left: 6px;
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
