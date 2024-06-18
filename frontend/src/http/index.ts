import axios from 'axios'

export const API_URL = 'http://localhost:3000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers['Content-Type'] = 'application/json'
  config.headers
  return config
})

export default $api
