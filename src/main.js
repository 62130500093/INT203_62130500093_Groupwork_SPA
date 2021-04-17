import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import copyright from './components/copyright.vue'

const app = createApp(App).use(router).component('copyright-component',copyright);
app.mount('#app')
