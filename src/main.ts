import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import { createPinia } from 'pinia';
import registerModules from './registerModules/handle-register-module.js';
import router from './registerModules/router';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(registerModules).mount('#app');
