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

        <router-link to="/balance">
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
import NavigationIcon from '@/assets/icons/NavigationIcon.vue'
import DropdownIcon from '@/assets/icons/DropdownIcon.vue'
import HomeIcon from '@/assets/icons/HomeIcon.vue'
import ArticlesIcon from '@/assets/icons/ArticlesIcon.vue'
import InteractiveIcon from '@/assets/icons/InteractiveIcon.vue'
import CompaniesIcon from '@/assets/icons/CompaniesIcon.vue'
import FAQIcon from '@/assets/icons/FAQIcon.vue'
import HelpIcon from '@/assets/icons/HelpIcon.vue'
import AddIcon from '@/assets/icons/AddIcon.vue'
import ProfileIcon from '@/assets/icons/ProfileIcon.vue'
import NotificationsIcon from '@/assets/icons/NotificationsIcon.vue'
import StarIcon from '@/assets/icons/StarIcon.vue'
import SettingsIcon from '@/assets/icons/SettingsIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import DraftIcon from '@/assets/icons/DraftIcon.vue'
import AnalyticsIcon from '@/assets/icons/AnalyticsIcon.vue'
import BalanceIcon from '@/assets/icons/BalanceIcon.vue'
import CheckmarkIcon from '@/assets/icons/CheckmarkIcon.vue'
import ShopIcon from '@/assets/icons/ShopIcon.vue'
import SignOutIcon from '@/assets/icons/SignOutIcon.vue'
import ChangesIcon from '@/assets/icons/ChangesIcon.vue'
import RulesIcon from '@/assets/icons/RulesIcon.vue'

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

<style lang="scss">
.header-brand-link {
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  margin-left: 195px !important; /* Сдвинул левее для всех экранов */
  
  &:hover {
    opacity: 0.8;
  }
}

.logo {
  margin: 0;
}

.header-title {
  font-family: var(--font-comfortaa);
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
  margin-left: 20px !important; /* Сдвинул левее для всех экранов */
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
  margin-left: 150px !important; /* Сдвинул левее для всех экранов */
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
  margin-right: 225px !important; /* Сдвинул левее для всех экранов */
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
  font-family: var(--font-sans-serif);
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
  width: 260px !important;
  height: 280px !important;
  left: 735px !important; /* Сдвинул левее на 50px */
  top: 100px !important;
}

.faq-panel {
  width: 260px !important;
  height: 280px !important;
  left: 1150px !important; /* Сдвинул левее на 50px */
  top: 100px !important;
}

.additional-panel {
  width: 260px !important;
  height: 290px !important;
  left: 1295px !important; /* Сдвинул левее на 50px */
  top: 100px !important;
}

.profile-panel {
  width: 290px !important;
  height: 777px !important;
  left: 1410px !important; /* Сдвинул левее на 50px */
  top: 100px !important;
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
  font-family: var(--font-sans-serif);
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
  font-family: var(--font-sans-serif);
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

/* ============ SKELETON ANIMATIONS ============ */

/* Skeleton загрузочная анимация */
@keyframes skeleton-pulse {
  0% {
    background-color: rgba(67, 73, 86, 0.3);
  }
  50% {
    background-color: rgba(67, 73, 86, 0.6);
  }
  100% {
    background-color: rgba(67, 73, 86, 0.3);
  }
}

.skeleton {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: 8px;
  background-color: rgba(67, 73, 86, 0.3);
}

/* Скелетоны для конкретных элементов заголовка */
.skeleton-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0;
}

.skeleton-title {
  width: 200px;
  height: 24px;
  margin-left: 10px;
}

.skeleton-nav-button {
  width: 220px;
  height: 32px;
  margin-left: 14px;
}

.skeleton-faq-button {
  width: 140px;
  height: 32px;
  margin-left: 16px;
}

.skeleton-add-button {
  width: 65px;
  height: 32px;
  margin-left: 12px;
}

.skeleton-profile {
  width: 60px;
  height: 40px;
  border-radius: 20px;
  margin-left: 12px;
}

/* ============ RESPONSIVE DESIGN ============ */

/* Для экранов Full HD (1920x1080) и выше */
@media (min-width: 1919px) {
  
  .header-brand-link,
  .router-link-active.header-brand-link,
  .router-link-exact-active.header-brand-link {
    margin-left: 100px !important; /* Сдвинул левее на 50px */
  }
  
  .header-title {
    font-size: 35px !important;
  }
  
  .nav-button {
    width: 260px !important;
    height: 52px !important;
    margin-left: 20px !important; /* Сдвинул левее на 20px */
  }
  
  .faq-button {
    width: 180px !important;
    height: 52px !important;
    margin-left: 150px !important; /* Сдвинул левее на 50px */
  }
  
  .additional-button {
    width: 105px !important;
    height: 52px !important;
  }
  
  .profile-button {
    width: 100px !important;
    height: 56px !important;
    margin-right: 225px !important; /* Сдвинул левее на 50px */
  }
  
  /* Позиции панелей теперь в базовых стилях */
}

/* Для экранов 1440p (2560x1440) */
@media (min-width: 2560px) and (max-width: 3839px) {
  .header-container {
    height: 80px !important;
    margin-top: 24px !important;
  }
  
  .header-brand-link,
  .router-link-active.header-brand-link,
  .router-link-exact-active.header-brand-link {
    margin-left: 200px !important;
  }
  
  .header-title {
    font-size: 55px !important;
    margin-left: 12px !important;
  }
  
  .logo {
    width: 100px !important;
    height: 100px !important;
  }
  
  .nav-button {
    width: 320px !important;
    height: 85px !important;
    margin-left: 55px !important;
  }
  
  .faq-button {
    width: 240px !important;
    height: 85px !important;
    margin-left: 180px !important;
  }
  
  .additional-button {
    width: 140px !important;
    height: 85px !important;
  }
  
  .profile-button {
    width: 130px !important;
    height: 90px !important;
    margin-right: 250px !important;
  }
  
  .profile-avatar {
    width: 50px !important;
    height: 50px !important;
    margin-left: 12px !important;
  }
  
  .button-text {
    font-size: 42px !important;
    margin-left: 15px !important;
  }
  
  /* Hover эффекты для кнопок 2K */
  .nav-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .faq-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .additional-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .profile-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  /* Размеры иконок для 2K */
  .nav-icon {
    transform: scale(1.8) !important;
    margin-left: 28px !important;
    margin-right: 15px !important;
  }
  
  .faq-icon {
    transform: scale(1.8) !important;
    margin-left: 25px !important;
    margin-right: 15px !important;
  }
  
  .add-icon {
    transform: scale(1.8) !important;
    margin-left: 22px !important;
    margin-right: 15px !important;
  }
  
  .dropdown-icon {
    transform: scale(1.5) !important;
    margin-left: 25px !important;
    margin-right: 12px !important;
  }
  
  .panel-icon {
    transform: scale(2) !important;
    margin-left: 25px !important;
    margin-right: 18px !important;
  }
  
  .panel-text {
    font-size: 34px !important;
  }
  
  .panel-button {
    height: 85px !important;
    width: 340px !important;
  }
  
  .panel-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .navigation-panel {
    left: 1030px !important; /* Сдвинул левее на 70px */
    width: 370px !important;
    height: 460px !important;
    top: 130px !important;
  }
  
  .faq-panel {
    left: 1510px !important; /* Сдвинул левее на 70px */
    width: 370px !important;
    height: 460px !important;
    top: 130px !important;
  }
  
  .additional-panel {
    left: 1900px !important; /* Сдвинул левее на 70px */
    width: 370px !important;
    height: 480px !important;
    top: 130px !important;
  }
  
  .profile-panel {
    left: 2030px !important; /* Сдвинул левее на 70px */
    width: 440px !important;
    height: 1200px !important;
    top: 130px !important;
  }
  
  .profile-panel .panel-button {
    width: 420px !important;
    margin: 0 auto !important;
  }
  
  .profile-panel .panel-content {
    padding: 18px !important;
  }
  
  .profile-panel .panel-divider {
    width: 280px !important;
    margin: 12px auto !important;
  }
  
  /* Центрирование содержимого панелей для 2K */
  .panel-content {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding: 15px !important;
    gap: 12px !important;
  }
  
  .panel-button {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding-left: 18px !important;
    margin: 0 auto !important;
  }
  
  .panel-divider {
    align-self: center !important;
    margin: 8px auto !important;
  }
}

/* Для экранов 4K (3840x2160) и выше */
@media (min-width: 3840px) {
  .header-container {
    height: 100px !important;
    margin-top: 30px !important;
  }
  
  
  .header-brand-link,
  .router-link-active.header-brand-link,
  .router-link-exact-active.header-brand-link {
    margin-left: 100px !important; /* Сдвинул левее на 200px */
  }
  
  .header-title {
    font-size: 70px !important;
    margin-left: 15px !important;
  }
  
  .logo {
    width: 150px !important;
    height: 150px !important;
  }
  
  .nav-button {
    width: 380px !important;
    height: 70px !important;
    margin-left: 30px !important; /* Сдвинул левее на 40px */
  }
  
  .faq-button {
    width: 280px !important;
    height: 70px !important;
    margin-left: 150px !important; /* Сдвинул левее на 200px */
  }
  
  .additional-button {
    width: 155px !important;
    height: 70px !important;
  }
  
  .profile-button {
    width: 140px !important;
    height: 80px !important;
    margin-right: 300px !important; /* Сдвинул левее на 200px */
  }
  
  .profile-avatar {
    width: 60px;
    height: 60px;
    margin-left: 15px;
  }
  
  .button-text {
    font-size: 60px;
    margin-left: 18px;
  }
  
  /* Hover эффекты для кнопок */
  .nav-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .faq-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .additional-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .profile-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  /* Размеры иконок для 4K */
  .nav-icon {
    transform: scale(2.5) !important;
    margin-left: 40px !important;
    margin-right: 20px !important;
  }
  
  .faq-icon {
    transform: scale(2.5) !important;
    margin-left: 35px !important;
    margin-right: 20px !important;
  }
  
  .add-icon {
    transform: scale(2.5) !important;
    margin-left: 30px !important;
    margin-right: 20px !important;
  }
  
  .dropdown-icon {
    transform: scale(2) !important;
    margin-left: 35px !important;
    margin-right: 15px !important;
  }
  
  .panel-icon {
    transform: scale(2.8) !important;
    margin-left: 35px !important;
    margin-right: 25px !important;
  }
  
  .panel-text {
    font-size: 48px !important; /* Увеличил с 32px */
  }
  
  .panel-button {
    height: 120px !important; /* Увеличил с 80px */
    width: 480px !important; /* Уменьшил с 500px чтобы поместились */
  }
  
  .panel-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .navigation-panel {
    left: 900px !important; /* Сдвинул еще левее под новые кнопки */
    width: 520px !important; /* Уменьшил с 550px */
    height: 650px !important; /* Увеличил с 600px */
    top: 170px !important; /* Увеличил с 130px */
  }
  
  .faq-panel {
    left: 1400px !important; /* Сдвинул еще левее под новые кнопки */
    width: 520px !important; /* Уменьшил с 550px */
    height: 650px !important; /* Увеличил с 600px */
    top: 170px !important; /* Увеличил с 130px */
  }
  
  .additional-panel {
    left: 1900px !important; /* Сдвинул еще левее под новые кнопки */
    width: 520px !important; /* Уменьшил с 550px */
    height: 680px !important; /* Увеличил с 630px */
    top: 170px !important; /* Увеличил с 130px */
  }
  
  .profile-panel {
    left: 2200px !important; /* Сдвинул еще левее под новые кнопки */
    width: 620px !important; /* Увеличил с 600px */
    height: 1700px !important; /* Увеличил с 1600px */
    top: 170px !important; /* Увеличил с 130px */
  }
  
  .profile-panel .panel-button {
    width: 600px !important; /* Подогнал под новую ширину панели */
    margin: 0 auto !important;
  }
  
  .profile-panel .panel-content {
    padding: 25px !important;
  }
  
  .profile-panel .panel-divider {
    width: 400px !important;
    margin: 15px auto !important;
  }
  
  /* Центрирование содержимого панелей для 4K */
  .panel-content {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding: 20px !important;
    gap: 15px !important;
  }
  
  .panel-button {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding-left: 25px !important;
    margin: 0 auto !important;
  }
  
  .panel-divider {
    align-self: center !important;
    margin: 10px auto !important;
  }
  
  /* Обновляем скелетоны для 4K */
  .skeleton-logo {
    width: 80px;
    height: 80px;
  }
  
  .skeleton-title {
    width: 300px;
    height: 36px;
    margin-left: 15px;
  }
  
  .skeleton-nav-button {
    width: 340px;
    height: 45px;
    margin-left: 18px;
  }
  
  .skeleton-faq-button {
    width: 240px;
    height: 45px;
    margin-left: 20px;
  }
  
  .skeleton-add-button {
    width: 115px;
    height: 45px;
    margin-left: 15px;
  }
  
  .skeleton-profile {
    width: 100px;
    height: 60px;
    border-radius: 30px;
    margin-left: 15px;
  }
}

</style>
