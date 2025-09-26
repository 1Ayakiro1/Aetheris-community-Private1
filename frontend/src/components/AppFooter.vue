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
    background: linear-gradient(90deg, var(--primary-violet) 0%, var(--primary-pink) 100%);
    height: 4px;
    width: 100%;
}

.footer-container {
    background-color: var(--bg-primary);
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    
    /* Мобильные устройства */
    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
        flex-direction: column;
        padding: 16px;
    }
    
    /* Планшеты */
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 90%;
        height: 350px;
        padding: 18px;
    }
    
    /* Десктоп */
    @media (min-width: 1025px) {
        width: 100%;
        max-width: 1400px;
        height: 430px;
        padding: 20px;
    }
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ae-logo-footer {
    width: 134px; /* Уменьшено на 20% с 168px */
    height: 147px; /* Уменьшено на 20% с 184px */
    margin-left: 16px; /* Уменьшено на 20% с 20px */
    position: absolute;
}

.site-title {
    font-family: var(--font-primary);
    font-size: 30px; /* Уменьшено на 20% с 38px */
    font-weight: bold;
    margin-left: 24px; /* Уменьшено на 20% с 30px */
    margin-top: 112px; /* Уменьшено на 20% с 140px */
    color: var(--text-primary);
}

.site-subtitle {
    font-family: var(--font-comfortaa);
    font-size: 24px; /* Уменьшено на 20% с 30px */
    font-weight: bold;
    margin-left: 24px; /* Уменьшено на 20% с 30px */
    color: var(--text-secondary);
}

.social-buttons {
    display: flex;
    flex-direction: row;
    gap: 16px; /* Уменьшено на 20% с 20px */
}

.social-button {
    width: 61px; /* Уменьшено на 20% с 76px */
    height: 61px; /* Уменьшено на 20% с 76px */
    border-radius: 50%;
    border: 2px solid white;
    margin-top: 16px; /* Уменьшено на 20% с 20px */
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
    width: 48px; /* Уменьшено на 20% с 60px */
    height: 48px; /* Уменьшено на 20% с 60px */
    transition: filter 0.3s ease-in-out;
}

.telegram-icon {
    height: 40px; /* Уменьшено на 20% с 50px */
    width: 40px; /* Уменьшено на 20% с 50px */
    margin-right: 1px;
}

.boosty-icon {
    height: 40px; /* Уменьшено на 20% с 50px */
    width: 36px; /* Уменьшено на 20% с 45px */
    margin-left: 1px;
}

.opensource-text {
    font-family: var(--font-comfortaa);
    font-size: 20px; /* Уменьшено на 20% с 25px */
    font-weight: bold;
    margin-top: 24px; /* Уменьшено на 20% с 30px */
    margin-left: 24px; /* Уменьшено на 20% с 30px */
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
    align-items: flex-start; /* Изменено с center на flex-start для выравнивания по левому краю */
    gap: 16px; /* Уменьшено на 20% с 20px */
    margin-left: auto;
}

.about-block {
    margin-top: 40px; /* Уменьшено на 20% с 50px */
}

.resources-block {
    margin-top: 40px; /* Уменьшено на 20% с 50px */
}

.footer-container .legal-block {
    margin-top: 40px; /* Уменьшено на 20% с 50px */
    margin-right: 40px; /* Уменьшено на 20% с 100px */
}

.block-title {
    font-family: var(--font-comfortaa);
    font-size: 26px; /* Уменьшено на 20% с 33px */
    font-weight: bold;
    margin-top: 40px; /* Уменьшено на 20% с 50px */
    color: var(--text-primary);
}

.block-link {
    font-family: var(--font-comfortaa);
    font-size: 20px; /* Уменьшено на 20% с 25px */
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

/* Только монолитное масштабирование через transform scale в App.vue */
/* Все размеры фиксированные - интерфейс выглядит абсолютно одинаково на всех разрешениях */
</style>
