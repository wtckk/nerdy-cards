import './assets/main.css'

import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers['Content-Type'] = 'application/json'
  return config
})

app.use(createPinia())
app.use(router)

app.mount('#app')
