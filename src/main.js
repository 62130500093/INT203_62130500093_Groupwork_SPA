import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'

const app = createApp(App).use(router).use(router);
app.mount('#app')