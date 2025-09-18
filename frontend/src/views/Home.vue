<template>
  <div class="home-container">
    <!-- Slide1 -->
    <div data-element="slide1" class="slide1">
      <img src="../assets/svgs/logo.svg" alt="Logo" class="slide1-logo">
      <h1 class="slide1-title">Aetheris</h1>
      <h2 class="slide1-subtitle">
        A community of IT developers, neural network scientists and ML engineers
      </h2>
    </div>
    
    <div class="divider"></div>
    
    <!-- Slide2 -->
    <div class="slide2">
      <!-- Background blur effects -->
      <div class="blur-effect blur-1"></div>
      <div class="blur-effect blur-2"></div>
      <div class="blur-effect blur-3"></div>
      <div class="blur-effect blur-4"></div>
      
      <!-- Images -->
      <img src="/src/assets/svgs/slide_img1.png" alt="Slide Image 1" class="slide-img-1">
      
      
      <h1 class="slide2-title slide2-title-1">
        Find ways to solve problems more effectively
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-1">
        Ask questions and work with others to find the best solutions to anything.
      </h2>
      
      <img src="/src/assets/svgs/slide_img3.png" alt="Slide Image 3" class="slide-img-3">
      
      <h1 class="slide2-title slide2-title-2">
        Develop and improve yourself by testing your skills on real projects
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-2">
        Write articles, delve into a new topic for you and become stronger
      </h2>
      
      <!-- Cubes -->
      <img src="/src/assets/svgs/cubes1.png" alt="Cubes 1" class="cubes-1">
      <img src="/src/assets/svgs/cubes2.png" alt="Cubes 2" class="cubes-2">
      
      <img src="/src/assets/imgs/slide_img4.png" alt="Slide Image 4" class="slide-img-4">
      
      <h1 class="slide2-title slide2-title-3">
        Solve problems together to achieve the desired result
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-3">
        Got an error or don't know how it works? Ask others!
      </h2>
      
      <img src="/src/assets/svgs/cubes4.png" alt="Cubes 4" class="cubes-4">
      <img src="/src/assets/svgs/cubes3.png" alt="Cubes 3" class="cubes-3">
      <img src="/src/assets/svgs/cubes5.png" alt="Cubes 5" class="cubes-5">
      <img src="/src/assets/svgs/cubes6.png" alt="Cubes 6" class="cubes-6">
      <img src="/src/assets/svgs/slide_img5.png" alt="Slide Image 5" class="slide-img-5">
      
      <h1 class="slide2-title slide2-title-4">
        Collaborate and join teams to turn ideas into reality
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-4">
        Join teams to bring the most complex projects to life!
      </h2>
      
      <h2 class="slide2-cta">
        Join our community to create!
      </h2>
      
      <router-link to="/signin" class="register-link">
        <button class="register-button">
          <p class="register-text">
            Register
          </p>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-container {
  max-width: 120rem;
  margin: 0 auto;
  background-color: var(--bg-primary);
}

/* Slide1 Styles */
.slide1 {
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh; /* Минимальная высота экрана */
}

.slide1-logo {
  position: absolute;
  width: 48rem;
  height: 49rem;
  top: 0;
  left: 0;
  z-index: 10;
}

.slide1-title {
  font-family: var(--font-sans);
  font-weight: normal;
  font-size: 4.6875rem;
  margin-left: auto;
  margin-right: 31.875rem;
  margin-top: 13.75rem;
  color: var(--text-primary);
}

.slide1-subtitle {
  font-family: var(--font-sans);
  font-weight: normal;
  font-size: 3.125rem;
  text-align: center;
  margin-left: auto;
  margin-right: 12rem;
  margin-top: 1.25rem;
  width: 56.25rem;
  color: var(--text-primary);
}

.divider {
  height: 0.25rem;
  width: 100%;
  background-color: white;
}

/* Slide2 Styles */
.slide2 {
  background: linear-gradient(180deg, #16181C 0%, #21003d 100%);
  display: flex;
  flex-direction: column;
  padding-bottom: 13rem; /* pb-52 */
  position: relative;
}

/* Blur Effects */
.blur-effect {
  width: 62.5rem;
  filter: blur(56.25rem);
  opacity: 0.1;
  background-color: var(--primary-violet);
  position: absolute;
}

.blur-1 {
  margin-left: 37.5rem;
  margin-top: 6.25rem;
  padding-top: 37.5rem;
}

.blur-2 {
  margin-left: -6.25rem;
  margin-top: 75rem;
  padding-top: 37.5rem;
}

.blur-3 {
  margin-left: 43.75rem;
  margin-top: 156.25rem;
  padding-top: 43.75rem;
}

.blur-4 {
  margin-left: 0.625rem;
  margin-top: 218.75rem;
  padding-top: 43.75rem;
}

/* Images */
.slide-img-1,
.slide-img-2,
.slide-img-3,
.slide-img-4,
.slide-img-5,
.cubes-1,
.cubes-2,
.cubes-3,
.cubes-4,
.cubes-5,
.cubes-6 {
  position: absolute;
}

.slide-img-1 {
  width: 71.25rem;
  height: 29.375rem;
  margin-left: 5rem;
  margin-top: 16rem;
}

.slide-img-2 {
  width: 61.25rem;
  height: 31.25rem;
  margin-left: 41.25rem;
  margin-top: 6rem;
}

.slide-img-3 {
  width: 37.5rem;
  height: 25rem;
  margin-left: 12.5rem;
  margin-top: 1270px;
}

.slide-img-4 {
  width: 31.25rem;
  height: 43.125rem;
  margin-left: 103.125rem;
  margin-top: 222.5rem;
}

.slide-img-5 {
  width: 31.25rem;
  height: 35rem;
  margin-left: 13.125rem;
  margin-top: 323.125rem;
}

.cubes-1 {
  width: 31.25rem;
  height: 31.25rem;
  margin-left: 1.25rem;
  margin-top: 16.25rem;
}

.cubes-2 {
  width: 25rem;
  height: 1000px;
  margin-left: 1300px;
  margin-top: 83.125rem;
}

.cubes-3 {
  width: 800px;
  height: 800px;
  margin-left: 93.125rem;
  margin-top: 223.125rem;
}

.cubes-4 {
  width: 25rem;
  height: 25rem;
  margin-left: 12.5rem;
  margin-top: 223.125rem;
}

.cubes-5 {
  width: 25rem;
  height: 12.5rem;
  margin-left: 3.125rem;
  margin-top: 353.125rem;
}

.cubes-6 {
  width: 25rem;
  height: 37.5rem;
  margin-left: 1300px;
  margin-top: 3490px;
}

/* Slide2 Text Styles */
.slide2-title {
  font-family: var(--font-sans);
  font-weight: normal;
  font-size: 3.125rem;
  text-align: center;
  color: var(--text-primary);
}

.slide2-title-1 {
  margin-left: auto;
  margin-right: 13.125rem;
  margin-top: 35rem;
  width: 63.125rem;
}

.slide2-title-2 {
  margin-left: auto;
  margin-right: 13.125rem;
  margin-top: 63.125rem;
  width: 63.125rem;
}

.slide2-title-3 {
  margin-left: 10rem; /* ml-40 */
  margin-right: 13.125rem;
  margin-top: 700px;
  width: 63.125rem;
}

.slide2-title-4 {
  margin-left: auto;
  margin-right: 13.125rem;
  margin-top: 800px;
  width: 63.125rem;
}

.slide2-subtitle {
  font-family: var(--font-sans);
  font-weight: normal;
  color: var(--text-secondary);
  font-size: 33px;
  text-align: center;
}

.slide2-subtitle-1 {
  margin-left: auto;
  margin-right: 11rem; /* mr-44 */
  margin-top: 1.25rem;
  width: 37.5rem;
}

.slide2-subtitle-2 {
  margin-left: auto;
  margin-right: 11rem; /* mr-44 */
  margin-top: 1.25rem;
  width: 37.5rem;
}

.slide2-subtitle-3 {
  margin-left: 190px;
  margin-right: 11rem; /* mr-44 */
  margin-top: 1.25rem;
  width: 37.5rem;
}

.slide2-subtitle-4 {
  margin-left: auto;
  margin-right: 11rem; /* mr-44 */
  margin-top: 1.25rem;
  width: 37.5rem;
}

.slide2-cta {
  font-family: var(--font-sans);
  font-weight: normal;
  color: var(--text-primary);
  font-size: 45px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 29.375rem;
  width: 700px;
}

/* Register Button */
.register-button {
  width: 23.125rem;
  height: 5rem;
  border-radius: 1.5625rem;
  background-color: var(--primary-blue);
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  filter: brightness(1);
}

.register-button:hover {
  filter: brightness(0.8);
}

.register-link {
  text-decoration: none;
}

.register-text {
  font-family: var(--font-sans);
  color: var(--text-primary);
  font-size: 33px;
  font-weight: bold;
}
</style>
