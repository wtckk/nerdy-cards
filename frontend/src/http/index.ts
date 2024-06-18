import { AuthResponse } from '@/domain/Responses'
import axios from 'axios'

export const API_URL = 'http://localhost:3000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers['Content-Type'] = 'application/json'
  return config
})

axios.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh-tokens`, {
          withCredentials: true
        })
        localStorage.setItem('token', response.data.accessToken)
        return axios.request(originalRequest)
      } catch (e) {
        console.log('не авторизован')
      }
    }
    throw error
  }
)

export default $api
