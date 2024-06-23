import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { AuthResponse } from '@/domain/Responses'

const API_URL = 'http://localhost:3000/api'

const handleError = (error: AxiosError, message: string): Error => {
  console.log('service message', message)
  if (error.response) {
    console.log('error data: ', error.response.data)
    console.log('error status: ', error.response.status)
    console.log('error headers: ', error.response.headers)
  } else if (error.request) {
    console.log('error request', error.request)
  } else {
    console.log('Error', error.message)
  }
  if (error instanceof Error) {
    return error
  } else {
    return new Error('Неизвестная ошибка')
  }
}

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

$api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _isRetry?: boolean }

    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post<AuthResponse>(
          `${API_URL}/auth/refresh-tokens`,
          {},
          {
            withCredentials: true
          }
        )
        localStorage.setItem('token', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('Не авторизован')
      }
    }
    throw error
  }
)

export { $api, handleError, API_URL }
