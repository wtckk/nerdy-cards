import { defineStore } from 'pinia'

import { LoginUser, RegistrationUser, User } from '@/domain/User'
import UserService from '@/services/UserService'

interface State {
  user: User | null
  token: string | ''
  isAuth: Boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    user: null,
    token: '',
    isAuth: false
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
        localStorage.setItem('user', JSON.stringify(response.user))

        this.token = response.accessToken
        this.isAuth = true
        this.user = response.user
        console.log('user')
      }
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
        localStorage.setItem('user', JSON.stringify(response.user))

        this.token = response.accessToken
        this.isAuth = true
        this.user = response.user
      }
    },

    async logout() {
      const response = await UserService.logout()

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        this.token = ''
        this.isAuth = false
        this.user = {} as User
      }
    },

    async refreshToken() {
      console.log(1)

      const token = localStorage.getItem('token')
      const newObj = localStorage.getItem('user')
      const user = JSON.parse(newObj)
      if (token) {
        this.token = token
        this.isAuth = true
        this.user = user
        console.log(this.user)
      }
    }
  }
})
