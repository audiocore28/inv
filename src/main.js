import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'

import App from './App.vue'
import router from './router'

const pinia = createPinia().use(createORM())
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')