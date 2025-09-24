<template>
  <div class="faq-help-container">
    <!-- Body -->
    <h2 class="page-title">Frequently Asked Questions</h2>
    <div class="content-wrapper">
      <!-- Sidebar -->
      <div class="sidebar">
        <router-link to="/faq">
          <button class="sidebar-button">FAQ</button>
        </router-link>
        <router-link to="/faq/user-ranks">
          <button class="sidebar-button">User ranks</button>
        </router-link>
        <router-link to="/faq/clan-ranks">
          <button class="sidebar-button">Clan ranks</button>
        </router-link>
        <router-link to="/faq/keywords">
          <button class="sidebar-button">Keywords</button>
        </router-link>
        <router-link to="/faq/changes">
          <button class="sidebar-button">Site changes</button>
        </router-link>
        <router-link to="/faq/help">
          <button class="sidebar-button">Help</button>
        </router-link>
      </div>
      
      <!-- Content -->
      <div class="content">
        <h2 class="content-title">Help</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No imports needed - header and footer are in main layout
</script>

<style scoped lang="scss">
// Import responsive mixins
@import '@/assets/main.scss';

.faq-help-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;

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
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 20px;
  text-align: center;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    font-size: 39px; // 30 * 1.3
    margin-top: 26px; // 20 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    font-size: 48px; // 30 * 1.6
    margin-top: 32px; // 20 * 1.6
  }
}

.content-wrapper {
  display: flex;
  flex-direction: row;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  width: 414px;
  height: 429px;
  margin-left: 251px;
  margin-top: 56px;
  gap: 8px;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    width: 538px; // 414 * 1.3
    height: 558px; // 429 * 1.3
    margin-left: 326px; // 251 * 1.3
    margin-top: 73px; // 56 * 1.3
    gap: 10px; // 8 * 1.3
    border-radius: 26px; // 20 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    width: 662px; // 414 * 1.6
    height: 686px; // 429 * 1.6
    margin-left: 402px; // 251 * 1.6
    margin-top: 90px; // 56 * 1.6
    gap: 13px; // 8 * 1.6
    border-radius: 32px; // 20 * 1.6
  }
}

.sidebar-button {
  width: 333px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  border: none;
  cursor: pointer;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    width: 433px; // 333 * 1.3
    height: 73px; // 56 * 1.3
    font-size: 33px; // 25 * 1.3
    border-radius: 20px; // 15 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    width: 533px; // 333 * 1.6
    height: 90px; // 56 * 1.6
    font-size: 40px; // 25 * 1.6
    border-radius: 24px; // 15 * 1.6
  }

  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
}

.content {
  width: 990px;
  height: 200px;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  margin-left: 12px;
  margin-top: 56px;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    width: 1287px; // 990 * 1.3
    height: 260px; // 200 * 1.3
    margin-left: 16px; // 12 * 1.3
    margin-top: 73px; // 56 * 1.3
    border-radius: 26px; // 20 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    width: 1584px; // 990 * 1.6
    height: 320px; // 200 * 1.6
    margin-left: 19px; // 12 * 1.6
    margin-top: 90px; // 56 * 1.6
    border-radius: 32px; // 20 * 1.6
  }
}

.content-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 20px;
  text-align: center;

  // 2K monitor scaling (+30%)
  @include responsive-2k {
    font-size: 39px; // 30 * 1.3
    margin-top: 26px; // 20 * 1.3
  }

  // 4K monitor scaling (+60% from base)
  @include responsive-4k {
    font-size: 48px; // 30 * 1.6
    margin-top: 32px; // 20 * 1.6
  }
}
</style>