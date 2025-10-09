<template>
  <div class="legal-another-container">
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

@import '@/assets/main.scss';

.legal-another-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;


  @media screen and (min-width: 1200px) {
    max-width: 2496px;
    padding-top: 130px;
    padding-bottom: 260px;
  }

  @include responsive-2k {
    max-width: 2496px;
    padding-top: 130px;
    padding-bottom: 260px;
  }

  @include responsive-4k {
    max-width: 3072px;
    padding-top: 160px;
    padding-bottom: 320px;
  }
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  color: red !important;
  font-size: 50px !important;
  font-family: var(--font-sans-serif);
  font-weight: bold;

  @media screen and (min-width: 1px) {
    font-size: 50px !important;
    color: red !important;
  }

  @media screen and (min-width: 1200px) {
    font-size: 39px;
    margin-top: 21px;
  }

  @include responsive-2k {
    font-size: 39px;
    margin-top: 21px;
  }

  @include responsive-4k {
    font-size: 48px;
    margin-top: 26px;
  }
}

.content-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;

  @include responsive-2k {
    gap: 16px;
    margin-top: 21px;
  }

  @include responsive-4k {
    gap: 19px;
    margin-top: 26px;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 370px;
  height: 655px;

  @include responsive-2k {
    gap: 13px;
    width: 481px;
    height: 852px;
  }

  @include responsive-4k {
    gap: 16px;
    width: 592px;
    height: 1048px;
  }
}

.sidebar-block {
  background-color: var(--bg-secondary);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  width: 370px;

  @include responsive-2k {
    border-radius: 33px;
    width: 481px;
  }

  @include responsive-4k {
    border-radius: 40px;
    width: 592px;
  }
    
  &.legal-block {
    height: 330px;

    @include responsive-2k {
      height: 429px;
    }

    @include responsive-4k {
      height: 528px;
    }
  }
  
  &.community-block {
    align-items: center;
    height: 84px;

    @include responsive-2k {
      height: 109px;
    }

    @include responsive-4k {
      height: 134px;
    }
  }
  
  &.security-block {
    padding: 16px;
    height: 221px;

    @include responsive-2k {
      padding: 21px;
      height: 287px;
    }

    @include responsive-4k {
      padding: 26px;
      height: 354px;
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

  @include responsive-2k {
    font-size: 33px;
    margin-top: 21px;
    margin-left: 62px;
  }

  @include responsive-4k {
    font-size: 40px;
    margin-top: 26px;
    margin-left: 77px;
  }
}

.button-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  margin-top: 8px;

  @include responsive-2k {
    gap: 10px;
    margin-top: 10px;
  }

  @include responsive-4k {
    gap: 13px;
    margin-top: 13px;
  }
  
  .security-block & {
    gap: 10px;
    margin-top: 16px;

    @include responsive-2k {
      gap: 13px;
      margin-top: 21px;
    }

    @include responsive-4k {
      gap: 16px;
      margin-top: 26px;
    }
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

  @include responsive-2k {
    width: 390px;
    height: 73px;
    border-radius: 20px;
    font-size: 30px;
  }

  @include responsive-4k {
    width: 480px;
    height: 90px;
    border-radius: 24px;
    font-size: 37px;
  }
  
  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
  
  .community-block & {
    margin-top: 16px;

    @include responsive-2k {
      margin-top: 21px;
    }

    @include responsive-4k {
      margin-top: 26px;
    }
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

  @include responsive-2k {
    width: 1300px;
    height: 852px;
    border-radius: 26px;
  }

  @include responsive-4k {
    width: 1600px;
    height: 1048px;
    border-radius: 32px;
  }
}
</style>