import './assets/main.css'

import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AuthResponse } from './domain/Responses'

import globalComponents from '@/components/Global'

const app = createApp(App)

app.use(globalComponents)
app.use(createPinia())
app.use(router)

app.mount('#app')
