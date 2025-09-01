<template>
  <header class="header">
    <div class="header-container">
      <!-- Логотип и название -->
      <img src="@/assets/svgs/logo.svg" alt="Logo" class="logo">
      <p class="site-title">Aetheris community</p>
      
      <!-- Navigation btn -->
      <button type="button" @click="toggleNavigation" class="nav-btn">
        <svg class="nav-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0013 28.3333C22.3651 28.3333 28.3346 22.3638 28.3346 15C28.3346 7.63619 22.3651 1.66666 15.0013 1.66666C7.63751 1.66666 1.66797 7.63619 1.66797 15C1.66797 22.3638 7.63751 28.3333 15.0013 28.3333Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20.6546 9.34666L17.828 17.8267L9.34797 20.6533L12.1746 12.1733L20.6546 9.34666Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="nav-text">Navigation</p>
        <svg class="nav-arrow" width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.25 2.375L12.5 12.625L22.75 2.375" stroke="#9BA4AE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Navigation panel -->
      <div v-show="showNavigation" class="navigation-panel">
        <div class="panel-content">
          <router-link to="/" class="panel-item">
            <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.83333 17.9019C1.83333 17.9019 3.04166 16.6111 6.66666 16.6111C10.2917 16.6111 12.7083 19.1927 16.3333 19.1927C19.9583 19.1927 21.1667 17.9019 21.1667 17.9019V2.41226C21.1667 2.41226 19.9583 3.70306 16.3333 3.70306C12.7083 3.70306 10.2917 1.12146 6.66666 1.12146C3.04166 1.12146 1.83333 2.41226 1.83333 2.41226V17.9019ZM1.83333 17.9019V26.9375" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Start page</p>
          </router-link>

          <router-link to="/articles" class="panel-item">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 6.94345C13.5 5.57408 12.9908 4.2608 12.0844 3.29251C11.1779 2.32422 9.94855 1.78024 8.66667 1.78024H1.41667V21.1423H9.87501C10.8364 21.1423 11.7584 21.5503 12.4383 22.2765C13.1181 23.0027 13.5 23.9876 13.5 25.0147M13.5 6.94345V25.0147M13.5 6.94345C13.5 5.57408 14.0092 4.2608 14.9157 3.29251C15.8221 2.32422 17.0515 1.78024 18.3333 1.78024H25.5833V21.1423H17.125C16.1636 21.1423 15.2416 21.5503 14.5617 22.2765C13.8819 23.0027 13.5 23.9876 13.5 25.0147" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Articles</p>
          </router-link>

          <router-link to="/articles/interactive" class="panel-item">
            <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 27.6735C20.1734 27.6735 25.5833 21.8943 25.5833 14.7654C25.5833 7.63654 20.1734 1.85742 13.5 1.85742C6.82656 1.85742 1.41667 7.63654 1.41667 14.7654C1.41667 21.8943 6.82656 27.6735 13.5 27.6735Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18.6233 9.29244L16.0617 17.5019L8.37667 20.2384L10.9383 12.0289L18.6233 9.29244Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Interactive</p>
          </router-link>

          <router-link to="/articles/companies" class="panel-item">
            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3333 24.7506V4.09781C18.3333 3.41312 18.0787 2.75648 17.6255 2.27234C17.1723 1.78819 16.5576 1.5162 15.9167 1.5162H11.0833C10.4424 1.5162 9.82771 1.78819 9.3745 2.27234C8.92128 2.75648 8.66667 3.41312 8.66667 4.09781V24.7506M3.83334 6.67941H23.1667C24.5014 6.67941 25.5833 7.83524 25.5833 9.26102V22.169C25.5833 23.5948 24.5014 24.7506 23.1667 24.7506H3.83334C2.49865 24.7506 1.41667 23.5948 1.41667 22.169V9.26102C1.41667 7.83524 2.49865 6.67941 3.83334 6.67941Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Companies</p>
          </router-link>
        </div>
      </div>

      <!-- FAQ btn -->
      <button type="button" @click="toggleFAQ" class="faq-btn">
        <svg class="faq-icon" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 9.66669V14.5M14.5 19.3334H14.512M9.49746 2.41669H19.5025L26.5833 9.49752V19.5025L19.5025 26.5834H9.49746L2.41663 19.5025V9.49752L9.49746 2.41669Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="faq-text">FAQ</p>
        <svg class="faq-arrow" width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L12.25 12.25L22.5 2" stroke="#9BA4AE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- FAQ navigation panel -->
      <div v-show="showFAQ" class="faq-navigation-panel">
        <div class="panel-content">
          <router-link to="/faq" class="panel-item">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 6.94345C13.5 5.57408 12.9908 4.2608 12.0844 3.29251C11.1779 2.32422 9.94855 1.78024 8.66667 1.78024H1.41667V21.1423H9.87501C10.8364 21.1423 11.7584 21.5503 12.4383 22.2765C13.1181 23.0027 13.5 23.9876 13.5 25.0147M13.5 6.94345V25.0147M13.5 6.94345C13.5 5.57408 14.0092 4.2608 14.9157 3.29251C15.8221 2.32422 17.0515 1.78024 18.3333 1.78024H25.5833V21.1423H17.125C16.1636 21.1423 15.2416 21.5503 14.5617 22.2765C13.8819 23.0027 13.5 23.9876 13.5 25.0147" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">FAQ page</p>
          </router-link>

          <router-link to="/faq/help" class="panel-item">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 6.94345C13.5 5.57408 12.9908 4.2608 12.0844 3.29251C11.1779 2.32422 9.94855 1.78024 8.66667 1.78024H1.41667V21.1423H9.87501C10.8364 21.1423 11.7584 21.5503 12.4383 22.2765C13.1181 23.0027 13.5 23.9876 13.5 25.0147M13.5 6.94345V25.0147M13.5 6.94345C13.5 5.57408 14.0092 4.2608 14.9157 3.29251C15.8221 2.32422 17.0515 1.78024 18.3333 1.78024H25.5833V21.1423H17.125C16.1636 21.1423 15.2416 21.5503 14.5617 22.2765C13.8819 23.0027 13.5 23.9876 13.5 25.0147" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Help</p>
          </router-link>

          <router-link to="/faq/changes" class="panel-item">
            <svg width="29" height="13" viewBox="0 0 29 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.41667 10.5833L14.5 2.41667L26.5833 10.5833" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Site changes</p>
          </router-link>

          <router-link to="/legal/community-rules" class="panel-item">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 6.94345C13.5 5.57408 12.9908 4.2608 12.0844 3.29251C11.1779 2.32422 9.94855 1.78024 8.66667 1.78024H1.41667V21.1423H9.87501C10.8364 21.1423 11.7584 21.5503 12.4383 22.2765C13.1181 23.0027 13.5 23.9876 13.5 25.0147M13.5 6.94345V25.0147M13.5 6.94345C13.5 5.57408 14.0092 4.2608 14.9157 3.29251C15.8221 2.32422 17.0515 1.78024 18.3333 1.78024H25.5833V21.1423H17.125C16.1636 21.1423 15.2416 21.5503 14.5617 22.2765C13.8819 23.0027 13.5 23.9876 13.5 25.0147" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Forum rules</p>
          </router-link>
        </div>
      </div>

      <!-- additional btn -->
      <button @click="toggleAdditional" class="additional-btn">
        <svg class="add-icon" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 7.91666V30.0833M7.91663 19H30.0833" stroke="#9BA4AE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg class="add-arrow" width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L12.25 12.25L22.5 2" stroke="#9BA4AE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- additional panel -->
      <div v-show="showAdditional" class="additional-panel">
        <div class="panel-content">
          <router-link to="/create-article" class="panel-item">
            <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 1.41667V27.5833M1.41667 14.5H23.5833" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">New article</p>
          </router-link>
          <div class="divider"></div>

          <button class="panel-item">
            <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.41667 1.41667H23.5833V16.5833H1.41667V1.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.25 6.25H18.75M6.25 10.4167H18.75M6.25 14.5833H18.75" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">List</p>
          </button>

          <button class="panel-item">
            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.41667 1.41667H8.75V8.75H1.41667V1.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16.25 1.41667H23.5833V8.75H16.25V1.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M1.41667 17.25H8.75V24.5833H1.41667V17.25Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16.25 17.25H23.5833V24.5833H16.25V17.25Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Grid</p>
          </button>

          <button class="panel-item">
            <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 1.41667L23.5833 7.08333V19.9167L12.5 25.5833L1.41667 19.9167V7.08333L12.5 1.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Default</p>
          </button>
        </div>
      </div>

      <!-- logo -->
      <button @click="toggleProfile" class="logo-btn">
        <div class="profile-avatar"></div>
        <svg class="logo-arrow" width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.25 2.375L12.5 12.625L22.75 2.375" stroke="#9BA4AE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Profile panel -->
      <div v-show="showProfile" class="profile-panel">
        <div class="panel-content">
          <router-link to="/profile" class="panel-item">
            <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 13C17.0228 13 21.5 8.52285 21.5 3C21.5 2.44772 21.0523 2 20.5 2H2.5C1.94772 2 1.5 2.44772 1.5 3C1.5 8.52285 5.97715 13 11.5 13Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.5 13V26" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Profile</p>
          </router-link>

          <router-link to="/notifications" class="panel-item">
            <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 2.41667C8.75 2.41667 5.75 5.41667 5.75 9.16667V14.5L2.41667 17.8333H22.5833L19.25 14.5V9.16667C19.25 5.41667 16.25 2.41667 12.5 2.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.5 22.5833C13.8807 22.5833 15 21.464 15 20.0833H10C10 21.464 11.1193 22.5833 12.5 22.5833Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Notifications</p>
          </router-link>

          <router-link to="/stared-articles" class="panel-item">
            <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2.41667L16.1633 9.88333L24.1667 10.8333L18.0833 16.4167L19.6667 24.4167L13 20.1667L6.33333 24.4167L7.91667 16.4167L1.83333 10.8333L9.83667 9.88333L13 2.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Stared articles</p>
          </router-link>

          <router-link to="/settings/appearance" class="panel-item">
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 2.41667C21.1734 2.41667 26.5833 7.82656 26.5833 14.5C26.5833 21.1734 21.1734 26.5833 14.5 26.5833C7.82656 26.5833 2.41667 21.1734 2.41667 14.5C2.41667 7.82656 7.82656 2.41667 14.5 2.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.5 8.75C16.7091 8.75 18.5 10.5409 18.5 12.75C18.5 14.9591 16.7091 16.75 14.5 16.75C12.2909 16.75 10.5 14.9591 10.5 12.75C10.5 10.5409 12.2909 8.75 14.5 8.75Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.5 20.1667C17.5 20.1667 20.1667 18.5 20.1667 16.5C20.1667 14.5 17.5 12.8333 14.5 12.8333C11.5 12.8333 8.83333 14.5 8.83333 16.5C8.83333 18.5 11.5 20.1667 14.5 20.1667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Settings</p>
          </router-link>
          <div class="divider"></div>

          <router-link to="/your-articles" class="panel-item">
            <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 6.94345C13.5 5.57408 12.9908 4.2608 12.0844 3.29251C11.1779 2.32422 9.94855 1.78024 8.66667 1.78024H1.41667V21.1423H9.87501C10.8364 21.1423 11.7584 21.5503 12.4383 22.2765C13.1181 23.0027 13.5 23.9876 13.5 25.0147M13.5 6.94345V25.0147M13.5 6.94345C13.5 5.57408 14.0092 4.2608 14.9157 3.29251C15.8221 2.32422 17.0515 1.78024 18.3333 1.78024H25.5833V21.1423H17.125C16.1636 21.1423 15.2416 21.5503 14.5617 22.2765C13.8819 23.0027 13.5 23.9876 13.5 25.0147" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Your articles</p>
          </router-link>

          <router-link to="/draft-articles" class="panel-item">
            <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 2.41667L26.5833 14.5L14.5 26.5833L2.41667 14.5L14.5 2.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Draft</p>
          </router-link>

          <router-link to="/analytics" class="panel-item">
            <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.41667 22.5833H15.5833M1.41667 22.5833V8.75L8.5 1.66667L15.5833 8.75V22.5833M1.41667 22.5833H15.5833" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Analytics</p>
          </router-link>

          <router-link to="/settings/subscription" class="panel-item">
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 2.41667C21.1734 2.41667 26.5833 7.82656 26.5833 14.5C26.5833 21.1734 21.1734 26.5833 14.5 26.5833C7.82656 26.5833 2.41667 21.1734 2.41667 14.5C2.41667 7.82656 7.82656 2.41667 14.5 2.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.5 8.75C16.7091 8.75 18.5 10.5409 18.5 12.75C18.5 14.9591 16.7091 16.75 14.5 16.75C12.2909 16.75 10.5 14.9591 10.5 12.75C10.5 10.5409 12.2909 8.75 14.5 8.75Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.5 20.1667C17.5 20.1667 20.1667 18.5 20.1667 16.5C20.1667 14.5 17.5 12.8333 14.5 12.8333C11.5 12.8333 8.83333 14.5 8.83333 16.5C8.83333 18.5 11.5 20.1667 14.5 20.1667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Balance</p>
          </router-link>
          <div class="divider"></div>

          <router-link to="/settings/subscription" class="panel-item">
            <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 1.41667L21.5833 8.5V15.5833H1.41667V8.5L11.5 1.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Subscription</p>
          </router-link>

          <router-link to="/shop" class="panel-item">
            <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 2.41667L26.5833 14.5L13.5 26.5833L0.416667 14.5L13.5 2.41667Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text">Shop</p>
          </router-link>
          <div class="divider"></div>

          <button class="panel-item sign-out">
            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.75 13H20.5833M20.5833 13L15.5833 8M20.5833 13L15.5833 18" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="panel-text sign-out-text">Sign out</p>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showNavigation = ref(false)
const showFAQ = ref(false)
const showProfile = ref(false)
const showAdditional = ref(false)

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value
  showFAQ.value = false
  showProfile.value = false
  showAdditional.value = false
}

const toggleFAQ = () => {
  showFAQ.value = !showFAQ.value
  showNavigation.value = false
  showProfile.value = false
  showAdditional.value = false
}

const toggleProfile = () => {
  showProfile.value = !showProfile.value
  showNavigation.value = false
  showFAQ.value = false
  showAdditional.value = false
}

const toggleAdditional = () => {
  showAdditional.value = !showAdditional.value
  showNavigation.value = false
  showFAQ.value = false
  showProfile.value = false
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  background: var(--bg-primary);
}

.header-container {
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 150px;
}

.logo {
  width: 118px;
  height: 134px;
}

.site-title {
  font-family: 'Comfortaa', sans-serif;
  font-size: 35px;
  font-weight: 700;
  color: var(--text-primary);
  margin-left: 10px;
}
</style>
