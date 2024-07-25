import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import router from './registerModules/router';
import registerModules from './registerModules/handle-register-module.ts';

createApp(App).use(router).use(registerModules).mount('#app');
