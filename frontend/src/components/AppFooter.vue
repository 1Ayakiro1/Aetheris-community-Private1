<template>
    <div class="footer-wrapper">
        <!-- Animated gradient background -->
        <div class="footer-background">
            <div class="gradient-orb gradient-orb-1"></div>
            <div class="gradient-orb gradient-orb-2"></div>
            <div class="gradient-orb gradient-orb-3"></div>
        </div>
        
        <!-- Main gradient line -->
        <div class="gradient-violet-pink"></div>
        
        <!-- Main footer content -->
        <div class="footer-main">
            <div class="footer-container">
                <!-- Left section: Brand and Newsletter -->
                <div class="footer-left">
                    <div class="brand-section">
                        <div class="logo-container">
                            <img src="../assets/svgs/logo.svg" alt="Logo" class="ae-logo-footer">
                            <div class="logo-glow"></div>
                        </div>
                        <div class="brand-text">
                            <h2 class="site-title">Aetheris Community</h2>
                            <p class="eternity-text">Eternity in our hands</p>
                        </div>
                    </div>
                    
                    <div class="newsletter-section">
                        <h3 class="newsletter-title">Subscribe to our developer newsletter</h3>
                        <p class="newsletter-description">Get tips, technical guides, and best practices. Twice a month.</p>
                        <button class="newsletter-button">
                            Subscribe
                        </button>
                    </div>
                </div>

                <!-- Right section: Navigation columns -->
                <div class="footer-right">
                    <!-- Platform column -->
                    <div class="footer-column">
                        <h4 class="column-title">Platform</h4>
                        <ul class="column-links">
                            <li><router-link to="/articles" class="column-link">Articles</router-link></li>
                            <li><router-link to="/create" class="column-link">Create Article</router-link></li>
                            <li><router-link to="/profile" class="column-link">Profile</router-link></li>
                            <li><router-link to="/notifications" class="column-link">Notifications</router-link></li>
                            <li><router-link to="/settings" class="column-link">Settings</router-link></li>
                            <li><router-link to="/analytics" class="column-link">Analytics</router-link></li>
                        </ul>
                    </div>

                    <!-- Community column -->
                    <div class="footer-column">
                        <h4 class="column-title">Community</h4>
                        <ul class="column-links">
                            <li><a href="https://discord.gg/XUFmR4bDMw" class="column-link external-link" target="_blank" rel="noopener noreferrer">Discord</a></li>
                            <li><a href="https://t.me/AetherisNews" class="column-link external-link" target="_blank" rel="noopener noreferrer">Telegram</a></li>
                            <li><a href="https://boosty.to/aetheris" class="column-link external-link" target="_blank" rel="noopener noreferrer">Boosty</a></li>
                            <li><router-link to="/faq" class="column-link">FAQ</router-link></li>
                            <li><router-link to="/faq/help" class="column-link">Help Center</router-link></li>
                            <li><router-link to="/news" class="column-link">News</router-link></li>
                        </ul>
                    </div>

                    <!-- Support column -->
                    <div class="footer-column">
                        <h4 class="column-title">Support</h4>
                        <ul class="column-links">
                            <li><router-link to="/faq/help" class="column-link">Documentation</router-link></li>
                            <li><router-link to="/faq" class="column-link">Community Forum</router-link></li>
                            <li><router-link to="/settings/support" class="column-link">Contact Support</router-link></li>
                            <li><router-link to="/faq/help" class="column-link">Status</router-link></li>
                            <li><a href="https://github.com/Aetheris-Community" class="column-link external-link" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        </ul>
                    </div>

                    <!-- Legal column -->
                    <div class="footer-column">
                        <h4 class="column-title">Legal</h4>
                        <ul class="column-links">
                            <li><router-link to="/legal/terms-of-use" class="column-link">Terms of Use</router-link></li>
                            <li><router-link to="/legal/privacy-policy" class="column-link">Privacy Policy</router-link></li>
                            <li><router-link to="/legal/content-rules" class="column-link">Content Rules</router-link></li>
                            <li><router-link to="/legal/copyright-policy" class="column-link">Copyright Policy</router-link></li>
                            <li><router-link to="/legal/community-rules" class="column-link">Community Rules</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Bottom section: Copyright and Social -->
        <div class="footer-bottom">
            <div class="footer-bottom-container">
                <div class="footer-bottom-left">
                    <span class="copyright-text">© 2024 Aetheris Community. All rights reserved.</span>
                    <div class="legal-links">
                        <router-link to="/legal/terms-of-use" class="legal-link">Terms</router-link>
                        <router-link to="/legal/privacy-policy" class="legal-link">Privacy</router-link>
                        <router-link to="/legal/content-rules" class="legal-link">Content Rules</router-link>
                        <router-link to="/legal/copyright-policy" class="legal-link">Copyright</router-link>
                    </div>
                </div>
                
                <div class="footer-bottom-right">
                    <div class="social-icons">
                        <a href="https://discord.gg/XUFmR4bDMw" class="social-icon-link" target="_blank" rel="noopener noreferrer" title="Discord">
                            <img class="social-icon discord-icon" src="../assets/imgs/discord_ico.png" alt="Discord">
                        </a>
                        <a href="https://t.me/AetherisNews" class="social-icon-link" target="_blank" rel="noopener noreferrer" title="Telegram">
                            <img class="social-icon telegram-icon" src="../assets/imgs/telegram_ico.png" alt="Telegram">
                        </a>
                        <a href="https://boosty.to/aetheris" class="social-icon-link" target="_blank" rel="noopener noreferrer" title="Boosty">
                            <img class="social-icon boosty-icon" src="../assets/imgs/boosty_ico.png" alt="Boosty">
                        </a>
                    </div>
                    <div class="language-selector">
                        <span class="language-text">English</span>
                        <svg class="language-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.footer-wrapper {
    width: 100%;
    position: relative;
    background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(139, 92, 246, 0.05) 50%, var(--bg-primary) 100%);
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Animated background orbs */
.footer-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
}

.gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.3;
    animation: float 6s ease-in-out infinite;
}

.gradient-orb-1 {
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, var(--primary-violet), var(--primary-pink));
    top: -100px;
    left: 10%;
    animation-delay: 0s;
}

.gradient-orb-2 {
    width: 150px;
    height: 150px;
    background: linear-gradient(45deg, var(--primary-blue), var(--primary-violet));
    top: 50%;
    right: 15%;
    animation-delay: 2s;
}

.gradient-orb-3 {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, var(--primary-pink), var(--primary-blue));
    bottom: -50px;
    left: 60%;
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

.gradient-violet-pink {
    background: linear-gradient(90deg, var(--primary-violet) 0%, var(--primary-pink) 100%);
    height: 4px;
    width: 100%;
    position: relative;
    z-index: 2;
}

/* Main footer section */
.footer-main {
    background: var(--bg-primary);
    padding: 60px 0 40px;
    position: relative;
    z-index: 3;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    gap: 80px;
    align-items: flex-start;
    
    @media (max-width: 1024px) {
        flex-direction: column;
        gap: 50px;
        padding: 0 16px;
    }
    
    @media (max-width: 768px) {
        gap: 40px;
        padding: 0 12px;
    }
}

/* Left section: Brand and Newsletter */
.footer-left {
    flex: 0 0 auto;
    min-width: 300px;
    max-width: 400px;
    
    @media (max-width: 1024px) {
        min-width: auto;
        max-width: none;
        width: 100%;
    }
}

.brand-section {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
    
    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        gap: 16px;
    }
}

.brand-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.logo-container {
    position: relative;
}

.ae-logo-footer {
    width: 60px;
    height: 60px;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
    
    &:hover {
        transform: scale(1.1);
    }
}

.logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse-glow 4s ease-in-out infinite;
    z-index: 1;
}

@keyframes pulse-glow {
    0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
}

.site-title {
    font-family: var(--font-primary);
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-violet) 50%, var(--primary-pink) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

/* Newsletter section */
.newsletter-section {
    margin-top: 24px;
}

.newsletter-title {
    font-family: var(--font-comfortaa);
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 8px 0;
    line-height: 1.4;
}

.newsletter-description {
    font-family: var(--font-comfortaa);
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0 0 16px 0;
    line-height: 1.5;
}

.newsletter-button {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 10px 20px;
    font-family: var(--font-comfortaa);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    z-index: 1;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--primary-violet), var(--primary-pink));
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 6px;
        z-index: -1;
    }
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--primary-violet);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
        
        &::before {
            opacity: 0.1;
        }
    }
    
    &:active {
        transform: translateY(0);
    }
}

.eternity-text {
    font-family: var(--font-comfortaa);
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    margin: 0;
    letter-spacing: 0.3px;
    font-style: italic;
    opacity: 0.8;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
        color: var(--text-primary);
        opacity: 1;
        transform: translateY(-1px);
    }
    
    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, var(--primary-violet), var(--primary-pink));
        transition: width 0.4s ease;
        border-radius: 1px;
    }
    
    &:hover::after {
        width: 100%;
    }
    
    @media (max-width: 768px) {
        font-size: 11px;
    }
}

/* Right section: Navigation columns */
.footer-right {
    display: flex;
    gap: 60px;
    flex: 1;
    
    @media (max-width: 1024px) {
        width: 100%;
        justify-content: space-between;
        gap: 40px;
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 30px;
    }
}

.footer-column {
    flex: 0 0 auto;
    min-width: 140px;
}

.column-title {
    font-family: var(--font-comfortaa);
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 16px 0;
    line-height: 1.4;
}

.column-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.column-link {
    font-family: var(--font-comfortaa);
    font-size: 14px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.3s ease;
    line-height: 1.4;
    position: relative;
    padding: 4px 0;
    display: inline-block;
    
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--primary-violet), var(--primary-pink));
        transition: width 0.3s ease;
        border-radius: 1px;
    }
    
    &:hover {
        color: var(--text-primary);
        transform: translateX(4px);
        
        &::before {
            width: 100%;
        }
    }
    
    &.external-link {
        position: relative;
        
        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: -12px;
            width: 8px;
            height: 8px;
            background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 17L17 7M17 7H7M17 7V17' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.6;
            transition: all 0.3s ease;
        }
        
        &:hover::after {
            opacity: 1;
            transform: rotate(45deg);
        }
    }
}

/* Bottom section: Copyright and Social */
.footer-bottom {
    background: rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 20px 0;
    position: relative;
    z-index: 3;
}

.footer-bottom-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        text-align: center;
        padding: 0 12px;
    }
}

.footer-bottom-left {
    display: flex;
    align-items: center;
    gap: 24px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
    }
}

.copyright-text {
    font-family: var(--font-comfortaa);
    font-size: 12px;
    color: var(--text-secondary);
    margin: 0;
}

.legal-links {
    display: flex;
    align-items: center;
    gap: 16px;
    
    @media (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
}

.legal-link {
    font-family: var(--font-comfortaa);
    font-size: 12px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    padding: 2px 0;
    display: inline-block;
    
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, var(--primary-violet), var(--primary-pink));
        transition: width 0.3s ease;
        border-radius: 1px;
    }
    
    &:hover {
        color: var(--text-primary);
        transform: translateY(-1px);
        
        &::before {
            width: 100%;
        }
    }
}

.footer-bottom-right {
    display: flex;
    align-items: center;
    gap: 24px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
    }
}

.social-icons {
    display: flex;
    align-items: center;
    gap: 12px;
}

.social-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--primary-violet), var(--primary-pink));
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 6px;
    }
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px) scale(1.1);
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
        
        &::before {
            opacity: 0.1;
        }
        
        .social-icon {
            transform: scale(1.1);
        }
    }
}

.social-icon {
    width: 20px;
    height: 20px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
}

.boosty-icon {
    filter: brightness(0) invert(1);
}

.language-selector {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: linear-gradient(90deg, var(--primary-violet), var(--primary-pink));
        transition: width 0.3s ease;
        border-radius: 1px;
    }
    
    &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: translateY(-1px);
        
        &::before {
            width: 100%;
        }
        
        .language-arrow {
            transform: rotate(180deg);
        }
    }
}

.language-text {
    font-family: var(--font-comfortaa);
    font-size: 12px;
    color: var(--text-secondary);
}

.language-arrow {
    width: 12px;
    height: 12px;
    color: var(--text-secondary);
    transition: transform 0.3s ease;
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
    .footer-wrapper {
        background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(139, 92, 246, 0.08) 50%, var(--bg-primary) 100%);
    }
    
    .footer-bottom {
        background: rgba(0, 0, 0, 0.2);
    }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    .gradient-orb {
        animation: none;
    }
    
    .logo-glow {
        animation: none;
    }
    
    .social-icon-link:hover {
        transform: none;
    }
    
    .column-link:hover {
        transform: none;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .footer-wrapper {
        border-top: 2px solid var(--text-primary);
    }
    
    .gradient-violet-pink {
        height: 3px;
    }
}
</style>

