import { defineStore } from 'pinia'

import axios from 'axios'
import { API_URL } from '@/http'

import { LoginUser, Profile, RegistrationUser, User } from '@/domain/User'
import { AuthResponse } from '@/domain/Responses'

import UserService from '@/services/UserService'
import ProfileService from '@/services/ProfileService'

interface State {
  user: User | null
  profile: Profile | null
  token: string
  isAuth: Boolean
  isLoading: Boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    user: null,
    profile: null,
    token: localStorage.getItem('token') || '',
    isAuth: false,
    isLoading: false
  }),

  getters: {
    getProfile() {
      return async (profileId: string) => {
        const response = await ProfileService.getProfile(profileId)

        if (response instanceof Error) {
          console.error('Ошибка при получении профиля по id:', response.message)
        } else {
          this.profile = response
          return this.profile
        }
      }
    },
    getUserProfile() {
      return async (userId: string) => {
        const response = await ProfileService.getProfileByUserId(userId)

        if (response instanceof Error) {
          console.error('Ошибка при получении профиля пользователя:', response.message)
        } else {
          this.profile = response
          return this.profile
        }
        return response
      }
    }
  },

  actions: {
    async loginUser(email: string, password: string) {
      const loginUser: LoginUser = { email, password }

      const response = await UserService.loginUser(loginUser)

      if (response instanceof Error) {
        console.error('Ошибка при авторизации пользователя:', response.message)
      } else {
        localStorage.setItem('token', response.accessToken)

        this.token = response.accessToken
        this.isAuth = true
        this.user = response.user
      }
      return response
    },

    async regUser(username: string, email: string, password: string) {
      const registrationUser: RegistrationUser = { username, email, password }

      const response = await UserService.registerUser(registrationUser)

      if (response instanceof Error) {
        console.error('Ошибка при регистрации пользователя:', response.message)
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
        console.error('Ошибка при выходе из акккаунта', response.message)
      } else {
        localStorage.removeItem('token')

        this.token = ''
        this.isAuth = false
        this.user = null
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
    },

    async updatedProfile(profileId: string, newProfile: object) {
      const response = await ProfileService.updateProfile(profileId, newProfile)

      if (response instanceof Error) {
        console.error('Ошибка при обновлении данных профиля', response.message)
      } else {
        return
      }

      return response
    }
  }
})
