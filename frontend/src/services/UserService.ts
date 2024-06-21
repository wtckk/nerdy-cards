import $api from '@/http'

import { AuthResponse } from '@/domain/Responses'
import { LoginUser, Profile, RegistrationUser } from '@/domain/User'

const getProfile = async (profileId: string): Promise<Profile | Error> => {
  try {
    const response = await $api.get<Profile>(`/profile/id/${profileId}`)

    return response.data
  } catch (error) {
    console.log(error, 'Ошибка получения профиля пользователя')

    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const getUserProfile = async (userId: string): Promise<Profile | Error> => {
  try {
    const response = await $api.get<Profile>(`/profile/by-user-id/${userId}`)

    return response.data
  } catch (error) {
    console.log(error, 'Ошибка получения профиля пользователя')

    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const loginUser = async (user: LoginUser): Promise<AuthResponse | Error> => {
  try {
    const response = await $api.post<AuthResponse>(`/auth/login`, user)

    return response.data
  } catch (error) {
    console.log(error, 'Ошибка авторизации пользователя')

    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const regUser = async (user: RegistrationUser): Promise<AuthResponse | Error> => {
  try {
    const response = await $api.post<AuthResponse>(`/auth/signup`, user)

    return response.data
  } catch (error) {
    console.log(error, 'Ошибка регистрации пользователя')

    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const logout = async (): Promise<object | Error> => {
  try {
    const response = await $api.post(`/auth/logout`)

    return response.data
  } catch (error) {
    console.log(error, 'Ошибка выхода из аккаунта')

    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const UserService = {
  getProfile,
  getUserProfile,

  regUser,
  loginUser,
  logout
}

export default UserService
