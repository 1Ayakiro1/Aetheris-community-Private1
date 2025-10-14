<template>
  <div class="header-container" :class="{ 'home-page': isWelcomePage, 'admin-access': auth.isAuthenticated }">
    <!-- Левая группа: Logo и Navigation -->
    <div class="header-left">
      <router-link to="/" class="header-brand-link">
        <Logo class="logo" />
        <p class="header-title">Aetheris Community</p>
      </router-link>

      <button type="button" id="nav-btn" class="nav-button">
        <NavigationIcon class="nav-icon" />
        <p class="button-text">{{ t('header.navigation.button') }}</p>
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
      <router-link to="/home">
        <button class="panel-button">
          <HomeIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.navigation.title1') }}</p>
        </button>
      </router-link>

      <router-link to="/">
        <button class="panel-button">
          <ArticlesIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.navigation.title2') }}</p>
        </button>
      </router-link>

      <router-link to="/articles/interactive">
        <button class="panel-button">
          <InteractiveIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.navigation.title3') }}</p>
        </button>
      </router-link>

      <router-link to="/articles/companies">
        <button class="panel-button">
          <CompaniesIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.navigation.title4') }}</p>
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
          <p class="panel-text">{{ t('header.faq.title1') }}</p>
        </button>
      </router-link>

      <router-link to="/faq/help">
        <button class="panel-button">
          <HelpIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.faq.title2') }}</p>
        </button>
      </router-link>

      <router-link to="/faq/changes">
        <button class="panel-button">
          <ChangesIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.faq.title3') }}</p>
        </button>
      </router-link>

      <router-link to="/legal/community-rules">
        <button class="panel-button">
          <RulesIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.faq.title4') }}</p>
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
          <p class="panel-text">{{ t('header.additional.title1') }}</p>
        </button>
      </router-link>

      <div class="panel-divider"></div>

      <button class="panel-button">
        <div class="icon-placeholder panel-icon"></div>
        <p class="panel-text">{{ t('header.additional.title2') }}</p>
      </button>

      <button class="panel-button">
        <div class="icon-placeholder panel-icon"></div>
        <p class="panel-text">{{ t('header.additional.title3') }}</p>
      </button>

      <button class="panel-button">
        <div class="icon-placeholder panel-icon"></div>
        <p class="panel-text">{{ t('header.additional.title4') }}</p>
      </button>
    </div>
  </div>

  <!-- Profile panel -->
  <div id="profile_panel" class="dropdown-panel profile-panel hidden opacity-0 pointer-events-none">
    <div class="panel-content">
      <router-link to="/profile">
        <button class="panel-button">
          <ProfileIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title1') }}</p>
        </button>
      </router-link>

      <router-link to="/notifications">
        <button class="panel-button">
          <NotificationsIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title2') }}</p>
        </button>
      </router-link>

      <router-link to="/stared-articles">
        <button class="panel-button">
          <StarIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title3') }}</p>
        </button>
      </router-link>

      <router-link to="/settings/appearance">
        <button class="panel-button">
          <SettingsIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title4') }}</p>
        </button>
      </router-link>

      <div class="panel-divider"></div>

      <router-link to="/your-articles">
        <button class="panel-button">
          <EditIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title5') }}</p>
        </button>
      </router-link>

      <router-link to="/draft">
        <button class="panel-button">
          <DraftIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title6') }}</p>
        </button>
      </router-link>

      <router-link to="/analytics">
        <button class="panel-button">
          <AnalyticsIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title7') }}</p>
        </button>
      </router-link>

      <router-link to="/balance">
        <button class="panel-button">
          <BalanceIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title8') }}</p>
        </button>
      </router-link>

      <router-link v-if="auth.isAuthenticated" to="/admin">
        <button class="panel-button">
          <SettingsIcon class="panel-icon" />
          <p class="panel-text">Admin Panel</p>
        </button>
      </router-link>

      <div class="panel-divider"></div>

      <router-link to="/settings/subscription">
        <button class="panel-button">
          <CheckmarkIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title9') }}</p>
        </button>
      </router-link>

      <router-link to="/shop">
        <button class="panel-button">
          <ShopIcon class="panel-icon" />
          <p class="panel-text">{{ t('header.profile.title10') }}</p>
        </button>
      </router-link>

      <div class="panel-divider"></div>

        <button v-if="auth.isAuthenticated" class="panel-button sign-out-button" @click="signOut">
            <SignOutIcon class="panel-icon" color="currentColor" />
            <p class="panel-text">{{ t('header.profile.title11') }}</p>
        </button>
        <router-link v-else to="/login">
          <button class="panel-button sign-in-button">
            <ProfileIcon class="panel-icon" />
            <p class="panel-text">{{ t('form.signin.title') }}</p>
          </button>
        </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const auth = useAuthStore()

// Route setup
const route = useRoute()
const router = useRouter()
const isWelcomePage = computed(() => route.name === 'Welcome')

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

  // If user has access to admin panel, shift dropdowns down a bit
  if (auth.isAuthenticated) {
    Object.values(panels).forEach(({ panel }) => {
      if (panel) panel.classList.add('admin-access')
    })
  }

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

function signOut() {
    auth.logout()
}

</script>

<style lang="scss">

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
  justify-content: space-between;
  width: 100%;
  background-color: var(--bg-primary);
  position: relative;
  box-sizing: border-box;

  /* Десктоп (базовые значения) */
  height: 80px;
  margin-top: 20px;
  padding: 0 20px;

  /* Планшеты */
  @media (max-width: 1024px) {
    height: 70px;
    margin-top: 16px;
    padding: 0 16px;
  }

  /* Мобильные устройства */
  @media (max-width: 768px) {
    height: 60px;
    margin-top: 12px;
    padding: 0 12px;
    flex-wrap: wrap;
  }
}
.header-container.admin-access {
  height: 110px;
}




// Navigation button
.nav-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  /* Десктоп (базовые значения) */
  width: 260px;
  height: 52px;
  padding: 8px 16px;

  /* Планшеты */
  @media (max-width: 1024px) {
    width: 220px;
    height: 46px;
    padding: 7px 14px;
  }

  /* Мобильные устройства */
  @media (max-width: 768px) {
    width: 200px;
    height: 40px;
    border-radius: 12px;
    padding: 6px 12px;
  }

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
  justify-content: center;
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
  margin-left: 0;
}

.faq-icon {
  margin-left: 16px;
}

.add-icon {
  margin-left: 0;
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

/* ==================== DROPDOWN PANELS POSITIONING ==================== */
/*
 * ВАЖНО ДЛЯ РАЗРАБОТЧИКОВ:
 *
 * 1. Структура каждой панели (Desktop-first подход):
 *    - Базовые значения (десктоп ≥1025px)
 *    - Планшеты: @media (max-width: 1024px)
 *    - Мобильные: @media (max-width: 768px)
 *
 * 2. Порядок панелей слева направо:
 *    Navigation (550px) → FAQ (870px) → Additional (1100px) → Profile (1210px)
 *
 * 3. НЕ ИСПОЛЬЗУЙ !important - все конфликты решены через правильную специфичность
 *
 * 4. Для изменения позиции:
 *    - Измени базовое значение left для десктопа
 *    - При необходимости измени значения в медиазапросах
 *
 * 5. Порядок медиазапросов везде одинаковый: Десктоп → Планшеты → Мобильные
 */

.dropdown-panel.navigation-panel {
  /* Десктоп (базовые значения) */
  width: 260px;
  height: 280px;
  top: 80px;
  left: 550px;

  /* Планшеты */
  @media (max-width: 1024px) {
    left: 220px;
    width: 220px;
    height: 260px;
  }

  /* Мобильные устройства */
  @media (max-width: 768px) {
    left: 10px;
    width: 200px;
    height: 240px;
  }
}

.dropdown-panel.faq-panel {
  /* Десктоп (базовые значения) */
  width: 260px;
  height: 280px;
  top: 80px;
  left: 870px;

  /* Планшеты */
  @media (max-width: 1024px) {
    left: 400px;
    width: 200px;
    height: 260px;
  }

  /* Мобильные устройства */
  @media (max-width: 768px) {
    left: 150px;
    width: 180px;
    height: 240px;
  }

    /* 2К экраны */
    @media (min-width: 2860px) {    /*ДОРАБОТАТЬ! ДЛЯ ДРУГИХ ПАНЕЛЕЙ */
    left: 920px;
  }
}

.dropdown-panel.additional-panel {
  /* Десктоп (базовые значения) */
  width: 260px;
  height: 290px;
  top: 80px;
  left: 1110px;

  /* Планшеты */
  @media (max-width: 1024px) {
    left: 570px;
    width: 200px;
    height: 270px;
  }

  /* Мобильные устройства */
  @media (max-width: 768px) {
    left: 280px;
    width: 180px;
    height: 250px;
  }

  /* 2К экраны */
  @media (min-width: 2860px) {    /*ДОРАБОТАТЬ! ДЛЯ ДРУГИХ ПАНЕЛЕЙ */
    left: 1250px;
  }
}

.dropdown-panel.profile-panel {
  /* Десктоп (базовые значения) */
  width: 300px;
  height: auto;
  min-height: 400px;
  max-height: 80vh;
  top: 80px;
  left: 1210px;

  /* Планшеты */
  @media (max-width: 1024px) {
    left: 720px;
    width: 280px;
    min-height: 350px;
    max-height: 75vh;
  }

  /* Мобильные устройства */
  @media (max-width: 768px) {
    left: 400px;
    width: 260px;
    min-height: 300px;
    max-height: 70vh;
  }

  /* 2К экраны */
  @media (min-width: 2860px) {    /*ДОРАБОТАТЬ! ДЛЯ ДРУГИХ ПАНЕЛЕЙ */
    left: 1350px;
  }
}

/* When header is taller for admin access, offset dropdowns */
.header-container.admin-access ~ .navigation-panel,
.header-container.admin-access ~ .faq-panel,
.header-container.admin-access ~ .additional-panel,
.header-container.admin-access ~ .profile-panel {
  top: 110px !important;
}

.panel-content {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;
}

.panel-content .panel-divider {
  align-self: flex-start;
  margin: 12px 0 12px 40px;
}

.profile-panel .panel-content {
  max-height: calc(80vh - 20px);
  overflow-y: auto;
  padding-right: 4px;
  padding-bottom: 30px;
}

/* Адаптивные настройки для скроллбара панели профиля */
@media (max-width: 1024px) {
  .profile-panel .panel-content {
    max-height: calc(75vh - 20px);
  }
}

@media (max-width: 768px) {
  .profile-panel .panel-content {
    max-height: calc(70vh - 20px);
  }
}

/* Стилизация скроллбара для панели профиля */
.profile-panel .panel-content::-webkit-scrollbar {
  width: 6px;
}

.profile-panel .panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.profile-panel .panel-content::-webkit-scrollbar-thumb {
  background: var(--text-secondary);
  border-radius: 3px;
}

.profile-panel .panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--text-primary);
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
  width: 280px;
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
  height: 2px;
  background-color: var(--btn-primary);
  margin: 8px 0 8px 48px;
  border-radius: 1px;
}

.profile-panel .panel-divider {
  width: 200px;
  height: 2px;
  background-color: var(--btn-primary);
  opacity: 1;
  display: block;
  flex-shrink: 0;
  align-self: flex-start;
}

// Sign out button special styling
.sign-out-button {
  height: 59px !important;
  min-height: 59px !important;
  max-height: 59px !important;
  flex-shrink: 0 !important;
  .panel-icon { color: #ef4444; transition: color 0.2s ease; }
  .panel-icon path,
  .panel-icon circle,
  .panel-icon line,
  .panel-icon polyline,
  .panel-icon polygon { stroke: currentColor !important; }
  &:hover {
    background-color: #ef4444;
    .panel-icon { color: #ffffff; }
  }
}

.sign-in-button {
  height: 59px !important;
  min-height: 59px !important;
  max-height: 59px !important;
  flex-shrink: 0 !important;
  background-color: var(--btn-primary);
  &:hover { 
  background-color: var(--text-secondary); 
  opacity: 0.4;
  }
}

// Router link styling
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
}

/* Только монолитное масштабирование через transform scale в App.vue */
/* Все размеры фиксированные - интерфейс выглядит абсолютно одинаково на всех разрешениях */

</style>
