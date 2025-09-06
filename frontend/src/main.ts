import './assets/main.scss';

// Инициализация темы при загрузке приложения
const initializeAppTheme = () => {
  // Функция для работы с cookies
  const getCookie = (name: string): string | null => {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  // Проверка системной темы
  const checkSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'night-dark'
    } else {
      return 'white'
    }
  }

  // Получаем сохраненную тему из cookies
  const savedTheme = getCookie('theme')
  let theme = 'aquamarine' // тема по умолчанию

  if (savedTheme && ['system', 'white', 'aquamarine', 'night-dark'].includes(savedTheme)) {
    if (savedTheme === 'system') {
      theme = checkSystemTheme()
    } else {
      theme = savedTheme
    }
  }

  // Применяем тему
  document.documentElement.setAttribute('data-theme', theme)
}

// Инициализируем тему
initializeAppTheme();

//primeui
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

//vue
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

console.log('Vue app started/Веб приложение запущено');
const app = createApp(App);

app.use(PrimeVue, {
    theme: { preset: Aura }
});

app.use(router);

app.mount('#app');
