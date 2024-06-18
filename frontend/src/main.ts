import './assets/main.css'

import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AuthResponse } from './domain/Responses'

const app = createApp(App)

// axios.interceptors.response.use(
//   (config) => {
//     return config
//   },
//   async (error) => {
//     const originalRequest = error.config

//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//       originalRequest._isRetry = true
//       try {
//         const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh-tokens`, {
//           withCredentials: true
//         })
//         localStorage.setItem('token', response.data.accessToken)
//         return axios.request(originalRequest)
//       } catch (e) {
//         console.log('не авторизован')
//       }
//     }
//     throw error
//   }
// )

app.use(createPinia())
app.use(router)

app.mount('#app')
