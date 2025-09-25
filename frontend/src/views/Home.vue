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
/* Cache buster comment - 2025-09-22-v2 */



.home-container {
  width: 100%;
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

/* Медиа-запросы для больших экранов */

/* Для экранов Full HD (1920x1080) */
@media (min-width: 1920px) and (max-width: 2559px) {
  /* Стили для Full HD экранов */
  
}

/* Для экранов 1440p (2560x1440) */
@media (min-width: 2560px) and (max-width: 3439px) {
  /* Стили для 2K экранов */
  
}

/* Для экранов 4K (3840x2160) */
@media (min-width: 3840px) and (max-width: 5119px) {
  /* Стили для 4K экранов */
  
}

/* Для экранов 5K+ (5120x2880 и выше) */
@media (min-width: 5120px) {
  /* Стили для 5K+ экранов */
  
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
  
  /* Изображения для Full HD */
  .slide-img-1 {
    width: 720px;
    height: 470px;
    margin-left: 120px; /* 80px - 300px */
    margin-top: 275px; /* 256px - 400px */
  }

  .slide-img-3 {
    width: 600px;
    height: 400px;
    margin-left: 200px; /* 200px - 300px */
    margin-top: 1220px; /* 1270px - 400px */
  }

  .slide-img-4 {
    width: 500px;
    height: 450px;
    margin-left: 1100px; /* 1050px - 300px */
    margin-top: 2220px; /* 2640px - 400px */
  }

  .slide-img-5 {
    width: 500px;
    height: 380px;
    margin-left: 250px; /* 150px - 300px */
    margin-top: 3350px; /* 3370px - 400px */
  }

  /* Кубы для Full HD */
  .cubes-1 {
    width: 500px;
    height: 500px;
    margin-left: 280px; /* 20px - 300px */
    margin-top: 910px; /* 1310px - 400px */
  }

  .cubes-2 {
    width: 400px;
    height: 1000px;
    margin-left: 1000px; /* 1300px - 300px */
    margin-top: 660px; /* 1060px - 400px */
  }

  .cubes-3 {
    width: 800px;
    height: 800px;
    margin-left: 750px; /* 950px - 300px */
    margin-top: 2260px; /* 2460px - 400px */
  }

  .cubes-4 {
    width: 400px;
    height: 400px;
    margin-left: 100px; /* 200px - 300px */
    margin-top: 2060px; /* 2460px - 400px */
  }

  .cubes-5 {
    width: 400px;
    height: 200px;
    margin-left: 250px; /* 50px - 300px */
    margin-top: 3360px; /* 3760px - 400px */
  }

  .cubes-6 {
    width: 400px;
    height: 600px;
    margin-left: 1000px; /* 1300px - 300px */
    margin-top: 3300px; /* 3700px - 400px */
  }
}

@media (min-width: 2560px) {
  .slide1-logo {
    width: 1100px;
    height: 1270px;
    margin-left: 150px
  }
  
  .slide1-title {
    font-size: 110px;
    margin-right: 750px;
    margin-top: 450px;
  }
  
  .slide1-subtitle {
    font-size: 70px;
    margin-right: 16rem;
    margin-top: 30px;
    width: 1400px;
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
  
  
  /* Позиционирование текста для 2K */
  .slide2-title-1 {
    margin-left: auto;
    margin-right: 200px;
    margin-top: 430px;
    width: 750px;
  }

  .slide2-title-2 {
    margin-left: auto;
    margin-right: 340px;
    margin-top: 750px;
    width: 750px;
  }

  .slide2-title-3 {
    margin-left: 200px;
    margin-right: 200px;
    margin-top: 800px;
    width: 750px;
  }

  .slide2-title-4 {
    margin-left: auto;
    margin-right: 300px;
    margin-top: 900px;
    width: 750px;
  }

  .slide2-subtitle-1 {
    margin-left: auto;
    margin-right: 13rem;
    margin-top: 25px;
    width: 700px;
  }

  .slide2-subtitle-2 {
    margin-left: auto;
    margin-right: 23rem;
    margin-top: 25px;
    width: 700px;
  }

  .slide2-subtitle-3 {
    margin-left: 230px;
    margin-right: 13rem;
    margin-top: 25px;
    width: 700px;
  }

  .slide2-subtitle-4 {
    margin-left: auto;
    margin-right: 20rem;
    margin-top: 25px;
    width: 700px;
  }
  
  /* Изображения для 2K */
  .slide-img-1 {
    width: 950px;
    height: 620px;
    margin-left: 200px;
    margin-top: 270px;
  }
  
  .slide-img-3 {
    width: 780px;
    height: 520px;
    margin-left: 250px;
    margin-top: 1470px;
  }
  
  .slide-img-4 {
    width: 650px;
    height: 580px;
    margin-left: 1450px;
    margin-top: 2500px;
  }
  
  .slide-img-5 {
    width: 650px;
    height: 490px;
    margin-left: 200px;
    margin-top: 3870px;
  }
  
  /* Кубы для 2K */
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
    margin-top: 280px;
  }
  
  .cubes-3 {
    width: 1050px;
    height: 1050px;
    margin-left: 1250px;
    margin-top: 2100px;
  }
  
  .cubes-4 {
    width: 520px;
    height: 520px;
    margin-left: 260px;
    margin-top: 2900px;
  }
  
  .cubes-5 {
    width: 520px;
    height: 260px;
    margin-left: 70px;
    margin-top: 3700px; 
  }
  
  .cubes-6 {
    width: 520px;
    height: 780px;
    margin-left: 1700px;
    margin-top: 3750px;
  }
}

@media (min-width: 3440px) {
  .slide1-logo {
    width: 1450px;
    height: 1470px;
  }
  
  .slide1-title {
    font-size: 140px;
    margin-right: 940px;
    margin-top: 500px;
  }
  
  .slide1-subtitle {
    font-size: 100px;
    margin-right: 22rem;
    margin-top: 35px;
    width: 1700px;
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
  
  
  /* Позиционирование текста для 4K */
  .slide2-title-1 {
    margin-left: auto;
    margin-right: 250px;
    margin-top: 500px;
    width: 1200px;
    font-size: 100px;
  }

  .slide2-title-2 {
    margin-left: auto;
    margin-right: 250px;
    margin-top: 900px;
    width: 1200px;
    font-size: 100px;
  }

  .slide2-title-3 {
    margin-left: 250px;
    margin-right: 250px;
    margin-top: 950px;
    width: 1200px;
    font-size: 100px;
  }

  .slide2-title-4 {
    margin-left: auto;
    margin-right: 250px;
    margin-top: 1100px;
    width: 1200px;
    font-size: 100px;
  }

  .slide2-subtitle-1 {
    margin-left: auto;
    margin-right: 15rem;
    margin-top: 30px;
    width: 1200px;
    font-size: 70px;
  }

  .slide2-subtitle-2 {
    margin-left: auto;
    margin-right: 15rem;
    margin-top: 30px;
    width: 1200px;
    font-size: 70px;
  }

  .slide2-subtitle-3 {
    margin-left: 280px;
    margin-right: 15rem;
    margin-top: 30px;
    width: 1200px;
    font-size: 70px;
  }

  .slide2-subtitle-4 {
    margin-left: auto;
    margin-right: 15rem;
    margin-top: 30px;
    width: 1200px;
    font-size: 70px;
  }
  
  /* Изображения для 4K */
  .slide-img-1 {
    width: 1150px;
    height: 770px;
    margin-left: 310px;
    margin-top: 400px;
  }
  
  .slide-img-3 {
    width: 950px;
    height: 650px;
    margin-left: 280px;
    margin-top: 1800px;
  }
  
  .slide-img-4 {
    width: 850px;
    height: 770px;
    margin-left: 2180px;
    margin-top: 3150px;
  }
  
  .slide-img-5 {
    width: 850px;
    height: 670px;
    margin-left: 270px;
    margin-top: 4700px;
  }
  
  /* Кубы для 4K */
  .cubes-1 {
    width: 800px;
    height: 750px;
    margin-left: 350px;
    margin-top: 2200px;
  }
  
  .cubes-2 {
    width: 650px;
    height: 1480px;
    margin-left: 1950px;
    margin-top: 1300px;
  }
  
  .cubes-3 {
    width: 1250px;
    height: 1250px;
    margin-left: 1450px;
    margin-top: 3700px;
  }
  
  .cubes-4 {
    width: 650px;
    height: 650px;
    margin-left: 300px;
    margin-top: 3700px;
  }
  
  .cubes-5 {
    width: 650px;
    height: 350px;
    margin-left: 80px;
    margin-top: 5700px;
  }
  
  .cubes-6 {
    width: 650px;
    height: 950px;
    margin-left: 1950px;
    margin-top: 5400px;
  }
}

:deep(.header-container) {
  .header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* Растягиваем элементы по всей ширине */
  width: auto;
  height: 80px;
  background-color: var(--bg-primary);
  position: relative;
  margin-top: 20px;
  box-sizing: border-box;
  margin-left: 20% !important;
  margin-right: 20% !important;
}
}
</style>
