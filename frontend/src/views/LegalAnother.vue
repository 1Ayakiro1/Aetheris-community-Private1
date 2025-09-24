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
// Component logic here
</script>

<style lang="scss" scoped>
// Import responsive mixins
@import '@/assets/main.scss';

.legal-another-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;

  // Тестовое правило для всех экранов 1200px+ 
  @media screen and (min-width: 1200px) {
    max-width: 2496px; // 1920 * 1.3
    padding-top: 130px; // 100 * 1.3
    padding-bottom: 260px; // 200 * 1.3
  }

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    max-width: 2496px; // 1920 * 1.3
    padding-top: 130px; // 100 * 1.3
    padding-bottom: 260px; // 200 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    max-width: 3072px; // 1920 * 1.6
    padding-top: 160px; // 100 * 1.6
    padding-bottom: 320px; // 200 * 1.6
  }
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  color: red !important; /* ТЕСТ - КРАСНЫЙ */
  font-size: 50px !important; /* ТЕСТ - ОГРОМНЫЙ */
  font-family: var(--font-sans-serif);
  font-weight: bold;

  // Тестовое правило - сработает на любом разрешении
  @media screen and (min-width: 1px) {
    font-size: 50px !important; // ТЕСТ - должен быть ОГРОМНЫЙ!
    color: red !important; // И КРАСНЫЙ!
  }

  // Тестовое правило для всех экранов 1200px+
  @media screen and (min-width: 1200px) {
    font-size: 39px; // 30 * 1.3 - ТЕСТ!
    margin-top: 21px; // 16 * 1.3
  }

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    font-size: 39px; // 30 * 1.3
    margin-top: 21px; // 16 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    font-size: 48px; // 30 * 1.6
    margin-top: 26px; // 16 * 1.6
  }
}

.content-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    gap: 16px; // 12 * 1.3
    margin-top: 21px; // 16 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    gap: 19px; // 12 * 1.6
    margin-top: 26px; // 16 * 1.6
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 370px;
  height: 655px; // 330px + 84px + 221px + gaps = 655px

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    gap: 13px; // 10 * 1.3
    width: 481px; // 370 * 1.3
    height: 852px; // 655 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    gap: 16px; // 10 * 1.6
    width: 592px; // 370 * 1.6
    height: 1048px; // 655 * 1.6
  }
}

.sidebar-block {
  background-color: var(--bg-secondary);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  width: 370px;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    border-radius: 33px; // 25 * 1.3
    width: 481px; // 370 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    border-radius: 40px; // 25 * 1.6
    width: 592px; // 370 * 1.6
  }
    
  &.legal-block {
    height: 330px; // Уменьшаем высоту legal блока

    // 2K monitor scaling (+30%)
    @include responsive-2k {
      height: 429px; // 330 * 1.3
    }

    // 4K monitor scaling (+60% from base)
    @include responsive-4k {
      height: 528px; // 330 * 1.6
    }
  }
  
  &.community-block {
    align-items: center;
    height: 84px; // Фиксированная высота для community блока

    // 2K monitor scaling (+30%)
    @include responsive-2k {
      height: 109px; // 84 * 1.3
    }

    // 4K monitor scaling (+60% from base)
    @include responsive-4k {
      height: 134px; // 84 * 1.6
    }
  }
  
  &.security-block {
    padding: 16px; // Добавляем padding чтобы кнопки не втыкались в края
    height: 221px; // Фиксированная высота для security блока

    // 2K monitor scaling (+30%)
    @include responsive-2k {
      padding: 21px; // 16 * 1.3
      height: 287px; // 221 * 1.3
    }

    // 4K monitor scaling (+60% from base)
    @include responsive-4k {
      padding: 26px; // 16 * 1.6
      height: 354px; // 221 * 1.6
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

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    font-size: 33px; // 25 * 1.3
    margin-top: 21px; // 16 * 1.3
    margin-left: 62px; // 48 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    font-size: 40px; // 25 * 1.6
    margin-top: 26px; // 16 * 1.6
    margin-left: 77px; // 48 * 1.6
  }
}

.button-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  margin-top: 8px;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    gap: 10px; // 8 * 1.3
    margin-top: 10px; // 8 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    gap: 13px; // 8 * 1.6
    margin-top: 13px; // 8 * 1.6
  }
  
  .security-block & {
    gap: 10px;
    margin-top: 16px;

    // 2K monitor scaling (+30%)
    @include responsive-2k {
      gap: 13px; // 10 * 1.3
      margin-top: 21px; // 16 * 1.3
    }

    // 4K monitor scaling (+60% from base)
    @include responsive-4k {
      gap: 16px; // 10 * 1.6
      margin-top: 26px; // 16 * 1.6
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

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    width: 390px; // 300 * 1.3
    height: 73px; // 56 * 1.3
    border-radius: 20px; // 15 * 1.3
    font-size: 30px; // 23 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    width: 480px; // 300 * 1.6
    height: 90px; // 56 * 1.6
    border-radius: 24px; // 15 * 1.6
    font-size: 37px; // 23 * 1.6
  }
  
  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
  
  .community-block & {
    margin-top: 16px;

    // 2K monitor scaling (+30%)
    @include responsive-2k {
      margin-top: 21px; // 16 * 1.3
    }

    // 4K monitor scaling (+60% from base)
    @include responsive-4k {
      margin-top: 26px; // 16 * 1.6
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

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    width: 1300px; // 1000 * 1.3
    height: 852px; // 655 * 1.3
    border-radius: 26px; // 20 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    width: 1600px; // 1000 * 1.6
    height: 1048px; // 655 * 1.6
    border-radius: 32px; // 20 * 1.6
  }
}
</style>