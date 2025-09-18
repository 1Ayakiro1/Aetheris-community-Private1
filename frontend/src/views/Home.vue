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
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding: 0 clamp(1rem, 3vw, 3rem);
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
  width: clamp(300px, 50vw, 1200px);
  height: clamp(310px, 52vw, 1250px);
  top: 0;
  left: 0;
  z-index: 10;
}

.slide1-title {
  font-family: var(--font-sans);
  font-weight: normal;
  font-size: clamp(2rem, 10vw, 8rem);
  margin-left: auto;
  margin-right: clamp(15rem, 25vw, 35rem);
  margin-top: clamp(8rem, 20vw, 15rem);
  color: var(--text-primary);
}

.slide1-subtitle {
  font-family: var(--font-sans);
  font-weight: normal;
  font-size: clamp(1.25rem, 6vw, 5rem);
  text-align: center;
  margin-left: auto;
  margin-right: clamp(6rem, 12vw, 15rem);
  margin-top: clamp(1rem, 2vw, 2rem);
  width: clamp(300px, 70vw, 1200px);
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
  font-weight: normal;
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
  font-weight: normal;
  color: var(--text-primary);
  font-size: 45px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 470px;
  width: 700px;
}

/* Register Button */
.register-button {
  width: 370px;
  height: 80px;
  border-radius: 25px;
  background-color: var(--primary-blue);
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
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

/* Адаптивность для элементов Home */
@media (min-width: 1920px) {
  .slide1-logo {
    width: 900px;
    height: 920px;
  }
  
  .slide1-title {
    font-size: 85px;
    margin-right: 600px;
    margin-top: 250px;
  }
  
  .slide1-subtitle {
    font-size: 55px;
    margin-right: 14rem;
    margin-top: 25px;
    width: 1000px;
  }
  
  .slide2-title {
    font-size: 55px;
  }
  
  .slide2-subtitle {
    font-size: 36px;
  }
  
  .slide2-cta {
    font-size: 50px;
    width: 800px;
    margin-top: 520px;
  }
  
  .register-button {
    width: 420px;
    height: 90px;
    border-radius: 28px;
    margin-top: 25px;
  }
  
  .register-text {
    font-size: 36px;
  }
  
  /* Увеличиваем размеры изображений */
  .slide-img-1 {
    width: 820px;
    height: 530px;
    margin-left: 90px;
    margin-top: 290px;
  }
  
  .slide-img-3 {
    width: 680px;
    height: 450px;
    margin-left: 220px;
    margin-top: 1420px;
  }
  
  .slide-img-4 {
    width: 570px;
    height: 510px;
    margin-left: 1200px;
    margin-top: 2520px;
  }
  
  .slide-img-5 {
    width: 570px;
    height: 430px;
    margin-left: 170px;
    margin-top: 3820px;
  }
  
  /* Увеличиваем размеры кубов */
  .cubes-1 {
    width: 570px;
    height: 570px;
    margin-left: 30px;
    margin-top: 1460px;
  }
  
  .cubes-2 {
    width: 450px;
    height: 1120px;
    margin-left: 1480px;
    margin-top: 1200px;
  }
  
  .cubes-3 {
    width: 900px;
    height: 900px;
    margin-left: 1080px;
    margin-top: 2760px;
  }
  
  .cubes-4 {
    width: 450px;
    height: 450px;
    margin-left: 230px;
    margin-top: 2760px;
  }
  
  .cubes-5 {
    width: 450px;
    height: 230px;
    margin-left: 60px;
    margin-top: 4260px;
  }
  
  .cubes-6 {
    width: 450px;
    height: 680px;
    margin-left: 1480px;
    margin-top: 4200px;
  }
}

@media (min-width: 2560px) {
  .slide1-logo {
    width: 1050px;
    height: 1070px;
  }
  
  .slide1-title {
    font-size: 100px;
    margin-right: 700px;
    margin-top: 300px;
  }
  
  .slide1-subtitle {
    font-size: 65px;
    margin-right: 16rem;
    margin-top: 30px;
    width: 1200px;
  }
  
  .slide2-title {
    font-size: 65px;
  }
  
  .slide2-subtitle {
    font-size: 42px;
  }
  
  .slide2-cta {
    font-size: 60px;
    width: 950px;
    margin-top: 620px;
  }
  
  .register-button {
    width: 480px;
    height: 105px;
    border-radius: 32px;
    margin-top: 30px;
  }
  
  .register-text {
    font-size: 42px;
  }
  
  /* Еще больше увеличиваем размеры изображений */
  .slide-img-1 {
    width: 950px;
    height: 620px;
    margin-left: 100px;
    margin-top: 340px;
  }
  
  .slide-img-3 {
    width: 780px;
    height: 520px;
    margin-left: 250px;
    margin-top: 1650px;
  }
  
  .slide-img-4 {
    width: 650px;
    height: 580px;
    margin-left: 1380px;
    margin-top: 2900px;
  }
  
  .slide-img-5 {
    width: 650px;
    height: 490px;
    margin-left: 200px;
    margin-top: 4400px;
  }
  
  /* Еще больше увеличиваем размеры кубов */
  .cubes-1 {
    width: 650px;
    height: 650px;
    margin-left: 40px;
    margin-top: 1700px;
  }
  
  .cubes-2 {
    width: 520px;
    height: 1280px;
    margin-left: 1700px;
    margin-top: 1380px;
  }
  
  .cubes-3 {
    width: 1050px;
    height: 1050px;
    margin-left: 1250px;
    margin-top: 3200px;
  }
  
  .cubes-4 {
    width: 520px;
    height: 520px;
    margin-left: 260px;
    margin-top: 3200px;
  }
  
  .cubes-5 {
    width: 520px;
    height: 260px;
    margin-left: 70px;
    margin-top: 4900px;
  }
  
  .cubes-6 {
    width: 520px;
    height: 780px;
    margin-left: 1700px;
    margin-top: 4850px;
  }
}

@media (min-width: 3440px) {
  .slide1-logo {
    width: 1200px;
    height: 1220px;
  }
  
  .slide1-title {
    font-size: 120px;
    margin-right: 800px;
    margin-top: 350px;
  }
  
  .slide1-subtitle {
    font-size: 80px;
    margin-right: 18rem;
    margin-top: 35px;
    width: 1400px;
  }
  
  .slide2-title {
    font-size: 80px;
  }
  
  .slide2-subtitle {
    font-size: 52px;
  }
  
  .slide2-cta {
    font-size: 75px;
    width: 1150px;
    margin-top: 750px;
  }
  
  .register-button {
    width: 550px;
    height: 120px;
    border-radius: 38px;
    margin-top: 35px;
  }
  
  .register-text {
    font-size: 52px;
  }
  
  /* Максимально увеличиваем размеры изображений */
  .slide-img-1 {
    width: 1100px;
    height: 720px;
    margin-left: 110px;
    margin-top: 400px;
  }
  
  .slide-img-3 {
    width: 900px;
    height: 600px;
    margin-left: 280px;
    margin-top: 1950px;
  }
  
  .slide-img-4 {
    width: 750px;
    height: 670px;
    margin-left: 1580px;
    margin-top: 3350px;
  }
  
  .slide-img-5 {
    width: 750px;
    height: 570px;
    margin-left: 230px;
    margin-top: 5100px;
  }
  
  /* Максимально увеличиваем размеры кубов */
  .cubes-1 {
    width: 750px;
    height: 750px;
    margin-left: 50px;
    margin-top: 2000px;
  }
  
  .cubes-2 {
    width: 600px;
    height: 1480px;
    margin-left: 1950px;
    margin-top: 1600px;
  }
  
  .cubes-3 {
    width: 1200px;
    height: 1200px;
    margin-left: 1450px;
    margin-top: 3700px;
  }
  
  .cubes-4 {
    width: 600px;
    height: 600px;
    margin-left: 300px;
    margin-top: 3700px;
  }
  
  .cubes-5 {
    width: 600px;
    height: 300px;
    margin-left: 80px;
    margin-top: 5700px;
  }
  
  .cubes-6 {
    width: 600px;
    height: 900px;
    margin-left: 1950px;
    margin-top: 5650px;
  }
}
</style>
