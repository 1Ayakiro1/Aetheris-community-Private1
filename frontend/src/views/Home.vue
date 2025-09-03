<template>
  <div class="home-container">
    <!-- Slide1 -->
    <div data-element="slide1" class="slide1">
      <img src="/src/assets/svgs/logo.svg" alt="Logo" class="slide1-logo">
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
      <img src="/src/assets/imgs/slide_img1.svg" alt="Slide Image 1" class="slide-img-1">
      <img src="/src/assets/imgs/slide_img2.svg" alt="Slide Image 2" class="slide-img-2">
      
      <h1 class="slide2-title slide2-title-1">
        Find ways to solve problems more effectively
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-1">
        Ask questions and work with others to find the best solutions to anything.
      </h2>
      
      <img src="/src/assets/imgs/slide_img3.svg" alt="Slide Image 3" class="slide-img-3">
      
      <h1 class="slide2-title slide2-title-2">
        Develop and improve yourself by testing your skills on real projects
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-2">
        Write articles, delve into a new topic for you and become stronger
      </h2>
      
      <!-- Cubes -->
      <img src="/src/assets/imgs/cubes1.svg" alt="Cubes 1" class="cubes-1">
      <img src="/src/assets/imgs/cubes2.svg" alt="Cubes 2" class="cubes-2">
      
      <img src="/src/assets/imgs/slide_img4.svg" alt="Slide Image 4" class="slide-img-4">
      
      <h1 class="slide2-title slide2-title-3">
        Solve problems together to achieve the desired result
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-3">
        Got an error or don't know how it works? Ask others!
      </h2>
      
      <img src="/src/assets/imgs/cubes4.svg" alt="Cubes 4" class="cubes-4">
      <img src="/src/assets/imgs/cubes3.svg" alt="Cubes 3" class="cubes-3">
      <img src="/src/assets/imgs/cubes5.svg" alt="Cubes 5" class="cubes-5">
      <img src="/src/assets/imgs/cubes6.svg" alt="Cubes 6" class="cubes-6">
      <img src="/src/assets/imgs/slide_img5.svg" alt="Slide Image 5" class="slide-img-5">
      
      <h1 class="slide2-title slide2-title-4">
        Collaborate and join teams to turn ideas into reality
      </h1>
      <h2 class="slide2-subtitle slide2-subtitle-4">
        Join teams to bring the most complex projects to life!
      </h2>
      
      <h2 class="slide2-cta">
        Join our community to create!
      </h2>
      
      <router-link to="/sign-in">
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
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
}

/* Slide1 Styles */
.slide1 {
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  padding-bottom: 13rem; /* pb-52 */
}

.slide1-logo {
  position: absolute;
  width: 768px;
  height: 784px;
  top: 120px;
}

.slide1-title {
  font-family: var(--font-sans);
  font-weight: bold;
  font-size: 75px;
  margin-left: auto;
  margin-right: 510px;
  margin-top: 220px;
  color: var(--text-primary);
}

.slide1-subtitle {
  font-family: var(--font-sans);
  font-weight: normal;
  font-size: 50px;
  text-align: center;
  margin-left: auto;
  margin-right: 12rem; /* mr-48 */
  margin-top: 20px;
  width: 900px;
  color: var(--text-primary);
}

.divider {
  height: 4px; /* h-1 */
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
  width: 1000px;
  filter: blur(900px);
  opacity: 0.1;
  background-color: var(--primary-violet);
  position: absolute;
}

.blur-1 {
  margin-left: 600px;
  margin-top: 100px;
  padding-top: 600px;
}

.blur-2 {
  margin-left: -100px;
  margin-top: 1200px;
  padding-top: 600px;
}

.blur-3 {
  margin-left: 700px;
  margin-top: 2500px;
  padding-top: 700px;
}

.blur-4 {
  margin-left: 10px;
  margin-top: 3500px;
  padding-top: 700px;
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
  width: 720px;
  height: 470px;
  margin-left: 80px; /* ml-20 */
  margin-top: 256px; /* mt-64 */
}

.slide-img-2 {
  width: 980px;
  height: 500px;
  margin-left: 660px;
  margin-top: 96px; /* mt-24 */
}

.slide-img-3 {
  width: 600px;
  height: 400px;
  margin-left: 200px;
  margin-top: 1270px;
}

.slide-img-4 {
  width: 500px;
  height: 450px;
  margin-left: 1050px;
  margin-top: 2240px;
}

.slide-img-5 {
  width: 500px;
  height: 380px;
  margin-left: 150px;
  margin-top: 3370px;
}

.cubes-1 {
  width: 500px;
  height: 500px;
  margin-left: 20px;
  margin-top: 1310px;
}

.cubes-2 {
  width: 400px;
  height: 1000px;
  margin-left: 1300px;
  margin-top: 1060px;
}

.cubes-3 {
  width: 800px;
  height: 800px;
  margin-left: 950px;
  margin-top: 2460px;
}

.cubes-4 {
  width: 400px;
  height: 400px;
  margin-left: 200px;
  margin-top: 2460px;
}

.cubes-5 {
  width: 400px;
  height: 200px;
  margin-left: 50px;
  margin-top: 3760px;
}

.cubes-6 {
  width: 400px;
  height: 600px;
  margin-left: 1300px;
  margin-top: 3700px;
}

/* Slide2 Text Styles */
.slide2-title {
  font-family: var(--font-sans);
  font-weight: bold;
  font-size: 50px;
  text-align: center;
  color: var(--text-primary);
}

.slide2-title-1 {
  margin-left: auto;
  margin-right: 150px;
  margin-top: 380px;
  width: 650px;
}

.slide2-title-2 {
  margin-left: auto;
  margin-right: 150px;
  margin-top: 650px;
  width: 650px;
}

.slide2-title-3 {
  margin-left: 160px; /* ml-40 */
  margin-right: 150px;
  margin-top: 700px;
  width: 650px;
}

.slide2-title-4 {
  margin-left: auto;
  margin-right: 150px;
  margin-top: 800px;
  width: 650px;
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
  margin-top: 20px;
  width: 600px;
}

.slide2-subtitle-2 {
  margin-left: auto;
  margin-right: 11rem; /* mr-44 */
  margin-top: 20px;
  width: 600px;
}

.slide2-subtitle-3 {
  margin-left: 190px;
  margin-right: 11rem; /* mr-44 */
  margin-top: 20px;
  width: 600px;
}

.slide2-subtitle-4 {
  margin-left: auto;
  margin-right: 11rem; /* mr-44 */
  margin-top: 20px;
  width: 600px;
}

.slide2-cta {
  font-family: var(--font-sans);
  font-weight: bold;
  color: var(--text-primary);
  font-size: 45px;
  text-align: center;
  margin-left: 540px;
  margin-top: 470px;
  width: 700px;
}

/* Register Button */
.register-button {
  width: 370px;
  height: 80px;
  border-radius: 25px;
  background-color: var(--primary-blue);
  margin-left: 700px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.register-button:hover {
  opacity: 0.9;
}

.register-text {
  font-family: var(--font-sans);
  color: var(--text-primary);
  font-size: 33px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.register-button:hover .register-text {
  color: var(--text-secondary);
}
</style>
