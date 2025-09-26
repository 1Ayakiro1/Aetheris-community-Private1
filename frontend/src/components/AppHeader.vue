<template>
  <div class="header-container" :class="{ 'home-page': isHomePage }">
    <!-- Левая группа: Logo и Navigation -->
    <div class="header-left">
      <router-link to="/" class="header-brand-link">
        <Logo class="logo" />
        <p class="header-title">Aetheris Community</p>
      </router-link>
      
      <button type="button" id="nav-btn" class="nav-button">
        <NavigationIcon class="nav-icon" />
        <p class="button-text">Navigation</p>
        <DropdownIcon class="dropdown-icon nav-arrow" />
      </button>
    </div>

    <!-- Центральная группа: FAQ -->
    <div class="header-center">
      <button type="button" id="faq-btn" class="faq-button">
        <FAQIcon class="faq-icon" />
        <p class="button-text">FAQ</p>
        <DropdownIcon class="dropdown-icon faq-arrow" />
      </button>
    </div>

    <!-- Правая группа: Additional и Profile -->
    <div class="header-right">
      <button id="add-btn" class="additional-button">
        <AddIcon class="add-icon" />
        <DropdownIcon class="dropdown-icon additional-arrow" />
      </button>

      <button id="logo-btn" class="profile-button">
        <div class="profile-avatar"></div>
        <DropdownIcon class="dropdown-icon profile-arrow" />
      </button>
    </div>
  </div>

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
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
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

// Route setup
const route = useRoute()
const isHomePage = computed(() => route.name === 'Home')

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
/* Группы хедера */

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-center {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-brand-link {
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  padding: 0;
  
  &:hover {
    opacity: 0.8;
  }
}

.logo {
  margin: 0;
  width: 100px;
  height: 100px;
}

.header-title {
  font-family: var(--font-comfortaa);
  font-size: 35px;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
  margin-left: 10px;
  white-space: nowrap;
  padding: 0;
}

.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* Растягиваем элементы по всей ширине */
  width: 100%;
  height: 80px;
  background-color: var(--bg-primary);
  position: relative;
  margin-top: 20px;
  box-sizing: border-box;
}

/* Стили для главной страницы */
.header-container.home-page {
  width: 80% !important;
  margin: 20px auto 0 auto !important;
}


// Navigation button
.nav-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Прижимаем содержимое к левому краю */
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  width: 230px;
  height: 52px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;
  padding: 0px;

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
  justify-content: center; /* Центрируем содержимое */
  background-color: rgba(67, 73, 86, 0);
  border-radius: 20px;
  width: 105px;
  height: 52px;
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
  transition: background-color 0.3s ease-in-out;
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

// FAQ arrow spacing
.faq-arrow {
  margin-left: 20px;
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
  margin-left: 0; /* Убираем отступ для прижимания к краю */
}

.faq-icon {
  margin-left: 16px;
}

.add-icon {
  margin-left: 0; /* Убираем отступ для прижимания к краю */
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

.dropdown-panel.navigation-panel {
  width: 260px !important;
  height: 280px !important;
  left: 34.8% !important; /* Адаптивное позиционирование относительно центра */
  top: 100px !important;
}

.dropdown-panel.faq-panel {
  width: 260px !important;
  height: 280px !important;
  left: 58.5% !important; /* Адаптивное позиционирование относительно центра */
  top: 100px !important;
}

.dropdown-panel.additional-panel {
  width: 260px !important;
  height: 290px !important;
  left: 78.5% !important; /* Адаптивное позиционирование относительно центра */
  top: 100px !important;
}

.dropdown-panel.profile-panel {
  width: 290px !important;
  height: 777px !important;
  left: 85.5% !important; /* Адаптивное позиционирование относительно центра */
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

/* Базовое разрешение 1920x1080 и ниже */
@media (max-width: 1920px) {
  .header-container {
    height: 80px !important;
    padding: 0 20px !important;
    margin-top: 20px !important;
  }
  
  .logo {
    width: 100px !important;
    height: 100px !important;
  }
  
  .header-title {
    font-size: 35px !important;
    margin-left: 10px !important;
  }
  
  .nav-button {
    width: 260px !important;
    height: 52px !important;
    border-radius: 15px !important;
  }
  
  .faq-button {
    width: 180px !important;
    height: 52px !important;
    border-radius: 20px !important;
  }
  
  .additional-button {
    width: 105px !important;
    height: 52px !important;
    border-radius: 20px !important;
  }
  
  .profile-button {
    width: 100px !important;
    height: 56px !important;
    border-radius: 15px !important;
  }
  
  .button-text {
    font-size: 23px !important;
    margin-left: 14px !important;
  }
}

/* Для экранов 1440p (2560x1440) - 2K */
@media (min-width: 2560px) and (max-width: 3839px) {
  .header-container {
    height: 104px !important; /* 80px * 1.3 */
    padding: 0 26px !important; /* 20px * 1.3 */
    margin-top: 26px !important; /* 20px * 1.3 */
  }
  
  .header-brand-link,
  .router-link-active.header-brand-link,
  .router-link-exact-active.header-brand-link {
    margin-left: 0 !important;
  }
  
  .header-title {
    font-size: 50px !important;
    margin-left: 12px !important;
  }
  
  .logo {
    width: 130px !important; /* 100px * 1.3 */
    height: 130px !important; /* 100px * 1.3 */
  }
  
  .header-title {
    font-size: 46px !important; /* 35px * 1.3 */
    margin-left: 13px !important; /* 10px * 1.3 */
  }
  
  .nav-button {
    width: 338px !important; /* 260px * 1.3 */
    height: 68px !important; /* 52px * 1.3 */
    border-radius: 20px !important; /* 15px * 1.3 */
  }
  
  .faq-button {
    width: 234px !important; /* 180px * 1.3 */
    height: 68px !important; /* 52px * 1.3 */
    border-radius: 26px !important; /* 20px * 1.3 */
  }
  
  .additional-button {
    width: 137px !important; /* 105px * 1.3 */
    height: 68px !important; /* 52px * 1.3 */
    border-radius: 26px !important; /* 20px * 1.3 */
  }
  
  .profile-button {
    width: 130px !important; /* 100px * 1.3 */
    height: 73px !important; /* 56px * 1.3 */
    border-radius: 20px !important; /* 15px * 1.3 */
  }
  
  .button-text {
    font-size: 30px !important; /* 23px * 1.3 */
    margin-left: 18px !important; /* 14px * 1.3 */
  }
  
  .profile-avatar {
    width: 50px !important;
    height: 50px !important;
    margin-left: 12px !important;
  }
  
  .button-text {
    font-size: 32px !important;
    margin-left: 15px !important;
  }
  
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
  
  .nav-icon {
    transform: scale(1.6) !important;
    margin-left: 0 !important;
    margin-right: 15px !important;
  }
  
  .faq-icon {
    transform: scale(1.6) !important;
    margin-left: 25px !important;
    margin-right: 15px !important;
  }
  
  .add-icon {
    transform: scale(1.6) !important;
    margin-left: 0 !important;
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
  
  .dropdown-panel.navigation-panel {
    left: 40% !important; /* Адаптивное позиционирование для 2K */
    width: 370px !important;
    height: 460px !important;
    top: 130px !important;
  }
  
  .dropdown-panel.faq-panel {
    left: 55.5% !important; /* Адаптивное позиционирование для 2K */
    width: 370px !important;
    height: 460px !important;
    top: 130px !important;
  }
  
  .dropdown-panel.additional-panel {
    left: 75.5% !important; /* Адаптивное позиционирование для 2K */
    width: 370px !important;
    height: 480px !important;
    top: 130px !important;
  }
  
  .dropdown-panel.profile-panel {
    left: 78.5% !important; /* Адаптивное позиционирование для 2K */
    width: 440px !important;
    height: 1200px !important;
    top: 130px !important;
  }
  
  .profile-panel .panel-button {
    width: 420px !important;
    height: 85px !important;
    margin: 0 auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding-left: 18px !important;
  }
  
  .profile-panel .panel-content {
    padding: 18px !important;
  }
  
  .profile-panel .panel-divider {
    width: 360px !important;
    margin: 12px auto !important;
  }
  
  .dropdown-panel {
    border-radius: 26px !important;
  }
  
  .panel-content {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
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
    width: 340px !important;
    height: 85px !important;
  }
  
  .panel-divider {
    align-self: center !important;
    margin: 8px auto !important;
    width: 280px !important;
  }
  
  /* Стили для главной страницы 2K */
  .header-container.home-page {
    width: 80% !important;
    margin: 26px auto 0 auto !important; /* 20px * 1.3 */
  }
  
}

/* Для экранов 4K (3840x2160) */
@media (min-width: 3840px) {
  .header-container {
    height: 128px !important; /* 80px * 1.6 */
    padding: 0 32px !important; /* 20px * 1.6 */
    margin-top: 32px !important; /* 20px * 1.6 */
  }
  
  .header-brand-link,
  .router-link-active.header-brand-link,
  .router-link-exact-active.header-brand-link {
    margin-left: 0 !important;
  }
  
  .logo {
    width: 160px !important; /* 100px * 1.6 */
    height: 160px !important; /* 100px * 1.6 */
  }
  
  .header-title {
    font-size: 56px !important; /* 35px * 1.6 */
    margin-left: 16px !important; /* 10px * 1.6 */
  }
  
  .nav-button {
    width: 416px !important; /* 260px * 1.6 */
    height: 83px !important; /* 52px * 1.6 */
    border-radius: 24px !important; /* 15px * 1.6 */
    transition: background-color 0.3s ease-in-out !important;
  }
  
  .faq-button {
    width: 288px !important; /* 180px * 1.6 */
    height: 83px !important; /* 52px * 1.6 */
    border-radius: 32px !important; /* 20px * 1.6 */
    transition: background-color 0.3s ease-in-out !important;
  }
  
  .additional-button {
    width: 168px !important; /* 105px * 1.6 */
    height: 83px !important; /* 52px * 1.6 */
    border-radius: 32px !important; /* 20px * 1.6 */
    transition: background-color 0.3s ease-in-out !important;
  }
  
  .profile-button {
    width: 160px !important; /* 100px * 1.6 */
    height: 90px !important; /* 56px * 1.6 */
    border-radius: 24px !important; /* 15px * 1.6 */
    transition: background-color 0.3s ease-in-out !important;
  }
  
  .button-text {
    font-size: 37px !important; /* 23px * 1.6 */
    margin-left: 22px !important; /* 14px * 1.6 */
  }
  
  .profile-avatar {
    width: 60px;
    height: 60px;
    margin-left: 15px;
  }
  
  .button-text {
    font-size: 50px;
    margin-left: 18px;
  }
  
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
  
  .nav-icon {
    transform: scale(2.5) !important;
    margin-left: 0 !important;
    margin-right: 20px !important;
  }
  
  .faq-icon {
    transform: scale(2.5) !important;
    margin-left: 35px !important;
    margin-right: 20px !important;
  }
  
  .add-icon {
    transform: scale(2.5) !important;
    margin-left: 0 !important;
    margin-right: 20px !important;
  }
  
  .nav-arrow {
    transform: scale(2.5) !important;
    margin-left: 35px !important;
    margin-right: 15px !important;
  }
  
  .faq-arrow {
    transform: scale(2) !important;
    margin-left: 35px !important;
    margin-right: 15px !important;
  }
  
  .additional-arrow {
    transform: scale(2.5) !important;
    margin-left: 25px !important;
    margin-right: 15px !important;
  }
  
  .profile-arrow {
    transform: scale(2.5) !important;
    margin-left: 25px !important;
    margin-right: 15px !important;
  }
  
  .panel-icon {
    transform: scale(2.8) !important;
    margin-left: 35px !important;
    margin-right: 25px !important;
  }
  
  .panel-text {
    font-size: 48px !important;
  }
  
  .panel-button {
    height: 120px !important;
    width: 480px !important;
  }
  
  .panel-button:hover {
    background-color: rgba(67, 73, 86, 1) !important;
  }
  
  .dropdown-panel.navigation-panel {
    left: 29.5% !important; /* Адаптивное позиционирование для 4K */
    width: 520px !important;
    height: 650px !important;
    top: 170px !important;
  }
  
  .dropdown-panel.faq-panel {
    left: 54% !important; /* Адаптивное позиционирование для 4K */
    width: 520px !important;
    height: 650px !important;
    top: 170px !important;
  }
  
  .dropdown-panel.additional-panel {
    left: 75% !important; /* Адаптивное позиционирование для 4K */
    width: 520px !important;
    height: 680px !important;
    top: 170px !important;
  }
  
  .dropdown-panel.profile-panel {
    left: 80% !important; /* Адаптивное позиционирование для 4K */
    width: 620px !important;
    height: 1700px !important;
    top: 170px !important;
  }
  
  .profile-panel .panel-button {
    width: 600px !important;
    margin: 0 auto !important;
  }
  
  .profile-panel .panel-content {
    padding: 25px !important;
  }
  
  .profile-panel .panel-divider {
    width: 400px !important;
    margin: 15px auto !important;
  }
  
  .dropdown-panel {
    border-radius: 36px !important;
  }
  
  .panel-content {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
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
  
  .skeleton-logo {
    width: 150px;
    height: 150px;
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
  
  /* Стили для главной страницы 4K */
  .header-container.home-page {
    width: 80% !important;
    margin: 32px auto 0 auto !important; /* 20px * 1.6 */
  }
  
}

</style>