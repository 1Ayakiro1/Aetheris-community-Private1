import './assets/main.scss';

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
