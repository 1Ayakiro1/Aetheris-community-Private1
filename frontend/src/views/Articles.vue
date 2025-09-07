<template>
  <div class="articles-container">
    <!-- Articles Body -->
    <div class="articles-body">
      <!-- First Left Block - Search -->
      <div class="search-section">
        <div class="search-container">
          <svg class="search-icon" width="42" height="38" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.6119 2H2L17.0448 19.7375V32L24.5672 35.75V19.7375L39.6119 2Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="search-divider"></div>
          <svg class="search-icon-2" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.8507 35.75L27.6701 27.5937M32.0895 17C32.0895 25.2843 25.3538 32 17.0448 32C8.73577 32 2 25.2843 2 17C2 8.71573 8.73577 2 17.0448 2C25.3538 2 32.0895 8.71573 32.0895 17Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Search Bar -->
          <input type="text" class="search-input" placeholder="Search anything">
        </div>
      </div>

      <!-- Second Right Block - Sidebar -->
      <div class="sidebar-section">
        <!-- Article Info -->
        <div class="article-info-card">
          <div class="card-header">
            <svg class="card-icon" width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7083 1.41666L1.625 15.9167H12.5L11.2917 25.5833L23.375 11.0833H12.5L13.7083 1.41666Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 class="card-title">Article info</h2>
          </div>
          
          <div class="info-item">
            <p class="info-label">Date:</p>
            <p class="info-value">unknown</p>
          </div>
          
          <div class="info-item">
            <p class="info-label">Likes:</p>
            <p class="info-value">unknown</p>
          </div>
          
          <div class="info-item">
            <p class="info-label">Views:</p>
            <p class="info-value">unknown</p>
          </div>
          
          <div class="info-item">
            <p class="info-label">Comments:</p>
            <p class="info-value">unknown</p>
          </div>
          
          <div class="info-item">
            <p class="info-label">Symbols:</p>
            <p class="info-value">unknown</p>
          </div>
        </div>

        <!-- Similar Articles -->
        <div class="similar-articles-card">
          <div class="card-header">
            <svg class="card-icon" width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7083 1.41666L1.625 15.9167H12.5L11.2917 25.5833L23.375 11.0833H12.5L13.7083 1.41666Z" stroke="#9BA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 class="card-title">Similar articles</h2>
          </div>
          
          <div class="similar-item">same article</div>
          <div class="similar-item">same article</div>
          <div class="similar-item">same article</div>
          <div class="similar-item">same article</div>
          <div class="similar-item">same article</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.articles-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

/* Articles Body */
.articles-body {
  display: flex;
  margin-top: 40px;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
}

/* First Left Block - Search Section */
.search-section {
  display: flex;
  flex-direction: column;
}

.search-container {
  width: 1060px;
  height: 70px;
  background-color: var(--bg-secondary);
  border-radius: 32px;
  display: flex;
  align-items: center;
}

.search-icon {
  margin-left: 21px;
}

.search-divider {
  width: 5px;
  height: 45px;
  margin-left: 30px;
  background-color: white;
  border-radius: 30px;
}

.search-icon-2 {
  margin-left: 30px;
}

.search-input {
  margin-left: 16px;
  width: 870px;
  height: 50px;
  background-color: var(--bg-primary);
  border-radius: 25px 25px 30px 30px;
  color: var(--text-primary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  padding-left: 16px;
  border: none;
  outline: none;
}

.search-input::placeholder {
  color: var(--text-third);
}

/* Second Right Block - Sidebar Section */
.sidebar-section {
  display: flex;
  flex-direction: column;
}

/* Article Info Card */
.article-info-card {
  width: 300px;
  height: 400px;
  background-color: var(--bg-secondary);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  margin-top: 24px;
}

.card-icon {
  margin-left: 24px;
  margin-top: 4px;
}

.card-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 0;
}

.info-item {
  display: flex;
  margin-top: 24px;
  margin-left: 24px;
}

.info-label {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin: 0;
}

.info-value {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin-left: 8px;
  margin: 0;
}

/* Similar Articles Card */
.similar-articles-card {
  width: 300px;
  height: 400px;
  background-color: var(--bg-secondary);
  margin-top: 16px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
}

.similar-item {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: 500;
  margin-top: 24px;
  margin-left: 24px;
  margin-bottom: 0;
  margin-right: 0;
}
</style>