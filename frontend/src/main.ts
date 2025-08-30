import './assets/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
console.log('Vue app started');
const app = createApp(App);

app.use(router);
app.mount('#app');
