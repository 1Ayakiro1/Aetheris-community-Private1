<template>
    <div class="footer-wrapper">
        <div class="gradient-violet-pink"></div>
        <div class="footer-container">
        <!--Logo and links block-->
        <div class="footer-content">
            <img src="../assets/svgs/logo.svg" alt="Logo" class="ae-logo-footer">
            <p class="site-title">Aetheris Community</p>
            <p class="site-subtitle">Eternity in our hands</p>
            <!--Social media buttons-->
            <div class="social-buttons">
                <a href="https://discord.gg/XUFmR4bDMw">
                    <button class="social-button">
                        <img class="social-icon" src="../assets/imgs/discord_ico.png" alt="discord">
                    </button>
                </a>

                <a href="https://t.me/AetherisNews">
                    <button class="social-button">
                        <img class="social-icon telegram-icon" src="../assets/imgs/telegram_ico.png" alt="telegram">
                    </button>
                </a>

                <a href="https://boosty.to/aetheris">
                    <button class="social-button">
                        <img class="social-icon boosty-icon" src="../assets/imgs/boosty_ico.png" alt="boosty">
                    </button>
                </a>
            </div>
            <p class="opensource-text">Community is <a href="https://github.com/Aetheris-Community" class="github-link">opensource</a></p>
        </div>
        <!--About us block-->
        <div class="footer-block about-block">
            <p class="block-title">About</p>
            <router-link to="/news">
                <p class="block-link">News</p>
            </router-link>
            <a href="https://github.com/1Ayakiro1/Aetheris_Community/commits/main/">
                <p class="block-link">Changelog</p>
            </a>
        </div>
        <!--Resources block-->
        <div class="footer-block resources-block">
            <p class="block-title">Resources</p>
            <router-link to="/faq/help">
                <p class="block-link">Help Center</p>
            </router-link>
            <router-link to="/faq">
                <p class="block-link">FAQ</p>
            </router-link>
        </div>
        <!--Legal block-->
        <div class="footer-block legal-block">
            <p class="block-title">Legal</p>
            <router-link to="/legal/terms-of-use">
                <p class="block-link">Terms of use</p>
            </router-link>
            <router-link to="/legal/privacy-policy">
                <p class="block-link">Privacy Policy</p>
            </router-link>
            <router-link to="/legal/content-rules">
                <p class="block-link">Content rules</p>
            </router-link>
            <router-link to="/legal/copyright-policy">
                <p class="block-link">Copyright policy</p>
            </router-link>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.footer-wrapper {
    width: 100%;
}

.gradient-violet-pink {
    background: linear-gradient(180deg, var(--primary-violet) 0%, var(--primary-pink) 100%);
    height: 4px;
    width: 100%;
}

.footer-container {
    background-color: var(--bg-primary);
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 430px;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ae-logo-footer {
    width: 168px;
    height: 184px;
    margin-left: 20px;
    position: absolute;
}

.site-title {
    font-family: var(--font-primary);
    font-size: 38px;
    font-weight: bold;
    margin-left: 30px;
    margin-top: 140px;
    color: var(--text-primary);
}

.site-subtitle {
    font-family: var(--font-comfortaa);
    font-size: 30px;
    font-weight: bold;
    margin-left: 30px;
    color: var(--text-secondary);
}

.social-buttons {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.social-button {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 2px solid white;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 0.3s ease-in-out;
    background: transparent;
    cursor: pointer;

    &:hover {
        filter: brightness(50%);
        
        .social-icon {
            filter: brightness(50%);
        }
    }
}

.social-icon {
    width: 60px;
    height: 60px;
    transition: filter 0.3s ease-in-out;
}

.telegram-icon {
    height: 50px;
    width: 50px;
    margin-right: 1px;
}

.boosty-icon {
    height: 50px;
    width: 45px;
    margin-left: 1px;
}

.opensource-text {
    font-family: var(--font-comfortaa);
    font-size: 25px;
    font-weight: bold;
    margin-top: 30px;
    margin-left: 30px;
    color: var(--text-secondary);
}

.github-link {
    color: var(--primary-blue);
    text-decoration: none;
    transition: text-decoration 0.3s ease-in-out;

    &:hover {
        text-decoration: underline;
    }
}

.footer-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-left: auto;
}

.about-block {
    margin-top: 50px;
}

.resources-block {
    margin-top: 50px;
}

.legal-block {
    margin-top: 50px;
    margin-right: 100px;
}

.block-title {
    font-family: var(--font-comfortaa);
    font-size: 33px;
    font-weight: bold;
    margin-top: 50px;
    color: var(--text-primary);
}

.block-link {
    font-family: var(--font-comfortaa);
    font-size: 25px;
    font-weight: normal;
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        color: #8a9495;
    }
}

a {
    text-decoration: none;
    color: inherit;
}

a:hover {
    text-decoration: none;
}

/* ============ SKELETON ANIMATIONS ============ */
@keyframes skeleton-pulse {
  0% { background-color: rgba(67, 73, 86, 0.3); }
  50% { background-color: rgba(67, 73, 86, 0.6); }
  100% { background-color: rgba(67, 73, 86, 0.3); }
}

.skeleton {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: 8px;
  background-color: rgba(67, 73, 86, 0.3);
}

.skeleton-logo {
  width: 168px;
  height: 184px;
  border-radius: 12px;
}

.skeleton-title {
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
}

.skeleton-subtitle {
  width: 250px;
  height: 30px;
  margin-bottom: 20px;
}

.skeleton-social-button {
  width: 76px;
  height: 76px;
  border-radius: 50%;
}

.skeleton-block-title {
  width: 120px;
  height: 35px;
  margin-bottom: 15px;
}

.skeleton-block-link {
  width: 150px;
  height: 25px;
  margin-bottom: 10px;
}

/* ============ RESPONSIVE DESIGN ============ */

/* Для экранов Full HD (1920x1080) и выше */
@media (min-width: 1919px) {
  /* Базовые стили остаются без изменений */
}

/* Для экранов 1440p (2560x1440) - увеличиваем на 30% */
@media (min-width: 2560px) and (max-width: 3839px) {
  .footer-container {
    height: 560px !important; /* 430 * 1.3 */
  }

  .ae-logo-footer {
    width: 218px !important; /* 168 * 1.3 */
    height: 239px !important; /* 184 * 1.3 */
    margin-left: 26px !important; /* 20 * 1.3 */
  }

  .site-title {
    font-size: 49px !important; /* 38 * 1.3 */
    margin-left: 39px !important; /* 30 * 1.3 */
    margin-top: 182px !important; /* 140 * 1.3 */
  }

  .site-subtitle {
    font-size: 39px !important; /* 30 * 1.3 */
    margin-left: 39px !important; /* 30 * 1.3 */
  }

  .social-buttons {
    gap: 26px !important; /* 20 * 1.3 */
  }

  .social-button {
    width: 99px !important; /* 76 * 1.3 */
    height: 99px !important; /* 76 * 1.3 */
    margin-top: 26px !important; /* 20 * 1.3 */
  }

  .social-icon {
    width: 78px !important; /* 60 * 1.3 */
    height: 78px !important; /* 60 * 1.3 */
  }

  .telegram-icon {
    height: 65px !important; /* 50 * 1.3 */
    width: 65px !important; /* 50 * 1.3 */
  }

  .boosty-icon {
    height: 65px !important; /* 50 * 1.3 */
    width: 59px !important; /* 45 * 1.3 */
  }

  .opensource-text {
    font-size: 33px !important; /* 25 * 1.3 */
    margin-top: 39px !important; /* 30 * 1.3 */
    margin-left: 39px !important; /* 30 * 1.3 */
  }

  .about-block,
  .resources-block,
  .legal-block {
    margin-top: 65px !important; /* 50 * 1.3 */
    gap: 26px !important; /* 20 * 1.3 */
  }

  .legal-block {
    margin-right: 130px !important; /* 100 * 1.3 */
  }

  .block-title {
    font-size: 43px !important; /* 33 * 1.3 */
    margin-top: 65px !important; /* 50 * 1.3 */
  }

  .block-link {
    font-size: 33px !important; /* 25 * 1.3 */
  }

  /* Скелетоны для 2K */
  .skeleton-logo {
    width: 218px !important;
    height: 239px !important;
  }

  .skeleton-title {
    width: 390px !important; /* 300 * 1.3 */
    height: 52px !important; /* 40 * 1.3 */
  }

  .skeleton-subtitle {
    width: 325px !important; /* 250 * 1.3 */
    height: 39px !important; /* 30 * 1.3 */
  }

  .skeleton-social-button {
    width: 99px !important;
    height: 99px !important;
  }

  .skeleton-block-title {
    width: 156px !important; /* 120 * 1.3 */
    height: 46px !important; /* 35 * 1.3 */
  }

  .skeleton-block-link {
    width: 195px !important; /* 150 * 1.3 */
    height: 33px !important; /* 25 * 1.3 */
  }
}

/* Для экранов 4K (3840x2160) - увеличиваем на 40% от 2K */
@media (min-width: 3840px) {
  .footer-container {
    height: 784px !important; /* 560 * 1.4 */
  }

  .ae-logo-footer {
    width: 305px !important; /* 218 * 1.4 */
    height: 335px !important; /* 239 * 1.4 */
    margin-left: 36px !important; /* 26 * 1.4 */
  }

  .site-title {
    font-size: 69px !important; /* 49 * 1.4 */
    margin-left: 55px !important; /* 39 * 1.4 */
    margin-top: 255px !important; /* 182 * 1.4 */
  }

  .site-subtitle {
    font-size: 55px !important; /* 39 * 1.4 */
    margin-left: 55px !important; /* 39 * 1.4 */
  }

  .social-buttons {
    gap: 36px !important; /* 26 * 1.4 */
  }

  .social-button {
    width: 139px !important; /* 99 * 1.4 */
    height: 139px !important; /* 99 * 1.4 */
    margin-top: 36px !important; /* 26 * 1.4 */
  }

  .social-icon {
    width: 109px !important; /* 78 * 1.4 */
    height: 109px !important; /* 78 * 1.4 */
  }

  .telegram-icon {
    height: 91px !important; /* 65 * 1.4 */
    width: 91px !important; /* 65 * 1.4 */
  }

  .boosty-icon {
    height: 91px !important; /* 65 * 1.4 */
    width: 83px !important; /* 59 * 1.4 */
  }

  .opensource-text {
    font-size: 46px !important; /* 33 * 1.4 */
    margin-top: 55px !important; /* 39 * 1.4 */
    margin-left: 55px !important; /* 39 * 1.4 */
  }

  .about-block,
  .resources-block,
  .legal-block {
    margin-top: 91px !important; /* 65 * 1.4 */
    gap: 36px !important; /* 26 * 1.4 */
  }

  .legal-block {
    margin-right: 182px !important; /* 130 * 1.4 */
  }

  .block-title {
    font-size: 60px !important; /* 43 * 1.4 */
    margin-top: 91px !important; /* 65 * 1.4 */
  }

  .block-link {
    font-size: 46px !important; /* 33 * 1.4 */
  }

  /* Hover эффекты для 4K */
  .social-button:hover {
    filter: brightness(50%) !important;
  }

  .block-link:hover {
    color: #8a9495 !important;
  }

  .github-link:hover {
    text-decoration: underline !important;
  }

  /* Скелетоны для 4K */
  .skeleton-logo {
    width: 305px !important;
    height: 335px !important;
  }

  .skeleton-title {
    width: 546px !important; /* 390 * 1.4 */
    height: 73px !important; /* 52 * 1.4 */
  }

  .skeleton-subtitle {
    width: 455px !important; /* 325 * 1.4 */
    height: 55px !important; /* 39 * 1.4 */
  }

  .skeleton-social-button {
    width: 139px !important;
    height: 139px !important;
  }

  .skeleton-block-title {
    width: 218px !important; /* 156 * 1.4 */
    height: 64px !important; /* 46 * 1.4 */
  }

  .skeleton-block-link {
    width: 273px !important; /* 195 * 1.4 */
    height: 46px !important; /* 33 * 1.4 */
  }
}
</style>
