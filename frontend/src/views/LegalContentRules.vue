<template>
  <div class="legal-content-rules-container">
    <!-- Body -->
    <h2 class="page-title">Site Policy Page</h2>
    <div class="content-wrapper">
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Legal block -->
        <div class="sidebar-block legal-block">
          <h3 class="block-title">Legal</h3>
          <div class="button-column">
            <router-link to="/legal/content-rules">
              <button class="sidebar-button">Content rules</button>
            </router-link>
            <router-link to="/legal/terms-of-use">
              <button class="sidebar-button">Terms of use</button>
            </router-link>
            <router-link to="/legal/copyright-policy">
              <button class="sidebar-button">Copyright policy</button>
            </router-link>
            <router-link to="/legal/another">
              <button class="sidebar-button">Another</button>
            </router-link>
          </div>
        </div>
        
        <!-- Community rules block -->
        <div class="sidebar-block community-block">
          <router-link to="/legal/community-rules">
            <button class="sidebar-button">Community rules</button>
          </router-link>
        </div>
        
        <!-- Security block -->
        <div class="sidebar-block security-block">
          <h3 class="block-title">Security</h3>
          <div class="button-column">
            <router-link to="/legal/privacy-policy">
              <button class="sidebar-button">Privacy Policy</button>
            </router-link>
            <router-link to="/legal/security">
              <button class="sidebar-button">Another</button>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <div class="content-block">
          <!-- Content will be added here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.legal-content-rules-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding: 0 16px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 50px 16px 100px 16px;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 75px 20px 150px 20px;
    max-width: 1000px;
  }
  
  @media (min-width: 1025px) {
    padding: 100px 24px 200px 24px;
  }
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  /* Планшеты */
  @media (min-width: 769px) and (max-width: 1024px) {
    gap: 16px;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    height: auto;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 320px;
    height: auto;
  }
  
  @media (min-width: 1025px) {
    width: 370px;
    height: 655px;
  }
}

.sidebar-block {
  background-color: var(--bg-secondary);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 20px;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 320px;
    border-radius: 22px;
  }
  
  @media (min-width: 1025px) {
    width: 370px;
    border-radius: 25px;
  }
    
  &.legal-block {
    @media (max-width: 768px) {
      height: auto;
      min-height: 280px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      height: 300px;
    }
    
    @media (min-width: 1025px) {
      height: 330px;
    }
  }
  
  &.community-block {
    align-items: center;
    
    @media (max-width: 768px) {
      height: 70px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      height: 75px;
    }
    
    /* Десктоп */
    @media (min-width: 1025px) {
      height: 84px;
    }
  }
  
  &.security-block {
    @media (max-width: 768px) {
      padding: 12px;
      height: auto;
      min-height: 180px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      padding: 14px;
      height: 200px;
    }
    
    @media (min-width: 1025px) {
      padding: 16px;
      height: 221px;
    }
  }
}

.block-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 16px;
  margin-left: 48px;
}

.button-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  margin-top: 8px;
  
  .security-block & {
    gap: 10px;
    margin-top: 16px;
  }
}

.sidebar-button {
  width: 300px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border: none;
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 23px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
  
  .community-block & {
    margin-top: 16px;
  }
}

.content {
  display: flex;
  justify-content: center;
}

.content-block {
  width: 1000px;
  height: 655px;
  background-color: var(--bg-secondary);
  border-radius: 20px;
}
</style>