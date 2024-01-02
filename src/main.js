import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/sass/main.scss'

const app = createApp(App)

app
    .use(createPinia())
    .mount('#app');
