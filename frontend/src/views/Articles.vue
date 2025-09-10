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
        
        <!-- Articles Container -->
        <div class="articles-container">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          
          <!-- Pagination -->
          <div class="pagination-container">
            <Paginator 
              v-model:first="first" 
              :rows="rows" 
              :totalRecords="totalRecords"
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              @page="onPageChange"
            />
          </div>
        </div>
        
        <!-- Back to Top Button -->
        <button 
          class="back-to-top-btn"
          @click="scrollToTop"
          :class="{ visible: showBackToTop }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
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
import { ref, onMounted, onUnmounted } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import Paginator from 'primevue/paginator'

const first = ref(0)
const rows = ref(10)
const totalRecords = ref(100)
const showBackToTop = ref(false)
const buttonOpacity = ref(1)

const onPageChange = (event: any) => {
  first.value = event.first
  rows.value = event.rows
  console.log('Page changed:', event)
  // Here will be the logic for loading articles for the new page
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  
  // Show button when scrolling down more than 300px
  showBackToTop.value = scrollY > 300
  
  // Find the real footer by class .footer-container
  const footer = document.querySelector('.footer-container') as HTMLElement
  const backToTopBtn = document.querySelector('.back-to-top-btn') as HTMLElement
  
  if (footer && backToTopBtn) {
    const footerRect = footer.getBoundingClientRect()
    const footerTop = footerRect.top
    const buttonHeight = 50 // button height
    const footerHeight = 430 // footer height from CSS
    
    console.log('Footer top:', footerTop, 'Window height:', windowHeight)
    
    // Smooth disappearance when approaching the footer (always calculate)
    const fadeDistance = 150 // distance to start disappearing
    const distanceToFooter = footerTop - windowHeight // distance from bottom of screen to footer
    
    let opacity = 1
    if (distanceToFooter <= fadeDistance && distanceToFooter > 0) {
      // Calculate opacity from 1 to 0 with sharper curve
      const fadeProgress = Math.max(0, distanceToFooter / fadeDistance)
      opacity = Math.pow(fadeProgress, 0.5) // square root curve for sharper disappearance
      console.log('Button fading, opacity:', opacity, 'distance to footer:', distanceToFooter)
    } else if (distanceToFooter <= 0) {
      // Footer is already visible - button is fully transparent
      opacity = 0
      console.log('Footer visible, button fully transparent')
    }
    
    // Apply opacity directly for smooth transition
    buttonOpacity.value = opacity
    backToTopBtn.style.opacity = opacity.toString()
    
    // If footer appeared in visible area (top border of footer is visible)
    if (footerTop <= windowHeight) {
      console.log('Footer is visible, switching to absolute position')
      
      // Calculate button position above footer
      const buttonPosition = footerTop - buttonHeight - 20 // 20px offset from footer
      
      if (buttonPosition > 0) {
        // Button above footer
        backToTopBtn.classList.add('above-footer')
        backToTopBtn.style.position = 'absolute'
        backToTopBtn.style.top = `${buttonPosition}px`
        backToTopBtn.style.left = '30px'
        backToTopBtn.style.bottom = 'auto'
        console.log('Button positioned above footer at:', buttonPosition)
      } else {
        // Footer too high, button in normal position
        backToTopBtn.classList.remove('above-footer')
        backToTopBtn.style.position = 'fixed'
        backToTopBtn.style.bottom = '30px'
        backToTopBtn.style.left = '30px'
        backToTopBtn.style.top = 'auto'
        console.log('Footer too high, using fixed position')
      }
    } else {
      // Footer not visible, button in fixed position
      backToTopBtn.classList.remove('above-footer')
      backToTopBtn.style.position = 'fixed'
      backToTopBtn.style.bottom = '30px'
      backToTopBtn.style.left = '30px'
      backToTopBtn.style.top = 'auto'
      console.log('Footer not visible, using fixed position')
    }
  } else {
    console.log('Footer or button not found')
    console.log('Footer found:', !!footer)
    console.log('Button found:', !!backToTopBtn)
    if (footer) {
      console.log('Footer element:', footer)
      console.log('Footer classes:', footer.className)
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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
  gap: 20px;
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

/* Articles Container */
.articles-container {
  width: 1060px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 5px 0;
}

/* Pagination Container */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
}

/* PrimeVue Paginator - Community Colors */
:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  color: var(--text-primary);
  font-family: var(--font-sans);
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page:hover) {
  background-color: #3b82f6 !important;
  color: white !important;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight),
:deep(.p-paginator .p-paginator-pages .p-paginator-page[aria-current="page"]),
:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-paginator-page-current) {
  background-color: #8b5cf6 !important;
  color: white !important;
}

/* Override any green colors */
:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  background-color: transparent !important;
}

:deep(.p-paginator .p-paginator-first),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-last) {
  color: var(--text-primary);
  font-family: var(--font-sans);
}

:deep(.p-paginator .p-paginator-first:hover),
:deep(.p-paginator .p-paginator-prev:hover),
:deep(.p-paginator .p-paginator-next:hover),
:deep(.p-paginator .p-paginator-last:hover) {
  background-color: #3b82f6 !important;
  color: white !important;
}

:deep(.p-paginator .p-paginator-first:disabled),
:deep(.p-paginator .p-paginator-prev:disabled),
:deep(.p-paginator .p-paginator-next:disabled),
:deep(.p-paginator .p-paginator-last:disabled) {
  color: var(--text-secondary);
  opacity: 0.6;
}

/* Back to Top Button */
.back-to-top-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  background-color: var(--primary-violet);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease, visibility 0.3s ease, transform 0.3s ease;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.back-to-top-btn.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top-btn:hover {
  background-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.back-to-top-btn:active {
  transform: translateY(0);
}

/* Button above footer - styles applied via JavaScript */
.back-to-top-btn.above-footer {
  transition: opacity 0.5s ease !important;
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