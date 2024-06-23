import { $api, handleError } from '@/http'
import { AxiosError } from 'axios'

import { AuthResponse, Success } from '@/domain/Responses'
import { LoginUser, RegistrationUser } from '@/domain/User'

const loginUser = async (user: LoginUser): Promise<AuthResponse | Error> => {
  try {
    const response = await $api.post<AuthResponse>(`/auth/login`, user)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка авторизации пользователя')
  }
}

const registerUser = async (user: RegistrationUser): Promise<AuthResponse | Error> => {
  try {
    const response = await $api.post<AuthResponse>(`/auth/signup`, user)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка регистрации пользователя')
  }
}

const logout = async (): Promise<Success | Error> => {
  try {
    const response = await $api.post<Success>(`/auth/logout`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка выхода из аккаунта')
  }
}

const UserService = {
  registerUser,
  loginUser,
  logout
}

export default UserService
