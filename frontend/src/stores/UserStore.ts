import { defineStore } from 'pinia'

import { LoginUser, RegistrationUser, User } from '@/domain/User'
import UserService from '@/services/UserService'
import axios from 'axios'
import { AuthResponse } from '@/domain/Responses'
import { API_URL } from '@/http'

interface State {
  user: User | null
  token: string | ''
  isAuth: Boolean
  isLoading: Boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    user: null,
    token: '',
    isAuth: false,
    isLoading: false
  }),

  actions: {
    async loginUser(email: string, password: string) {
      const loginUser: LoginUser = {
        email: email,
        password: password
      }

      const response = await UserService.loginUser(loginUser)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        localStorage.setItem('token', response.accessToken)

        this.token = response.accessToken
        this.isAuth = true
        this.user = response.user
      }
      return response
    },

    async regUser(username: string, email: string, password: string) {
      const registrationUser: RegistrationUser = {
        username: username,
        email: email,
        password: password
      }

      const response = await UserService.regUser(registrationUser)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        localStorage.setItem('token', response.accessToken)

        this.token = response.accessToken
        this.isAuth = true
        this.user = response.user
      }

      return response
    },

    async logout() {
      const response = await UserService.logout()

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        localStorage.removeItem('token')

        this.token = ''
        this.isAuth = false
        this.user = {} as User
      }
    },

    async checkAuth() {
      this.isLoading = true
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh-tokens`, {
          withCredentials: true
        })

        localStorage.setItem('token', response.data.accessToken)

        this.isAuth = true
        this.user = response.data.user
      } catch (error) {
        console.log(error, 'Ошибка проверки авторизации')
      } finally {
        this.isLoading = false
      }
    }
  }
})
