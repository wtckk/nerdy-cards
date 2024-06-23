import { $api, handleError } from '@/http'
import { AxiosError } from 'axios'

import { Success } from '@/domain/Responses'
import { Profile } from '@/domain/User'

const getProfile = async (profileId: string): Promise<Profile | Error> => {
  try {
    const response = await $api.get<Profile>(`/profile/id/${profileId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка получения профиля по id')
  }
}

const getProfileByUserId = async (userId: string): Promise<Profile | Error> => {
  try {
    const response = await $api.get<Profile>(`/profile/by-user-id/${userId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка получения профиля пользователя')
  }
}

const updateAvatar = async (profileId: string, file: FormData): Promise<string | Error> => {
  try {
    const response = await $api.post(`/profile/avatar/${profileId}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка загрузки аватара')
  }
}

const updateProfile = async (profileId: string, newProfile: object): Promise<Success | Error> => {
  try {
    const response = await $api.put<Success>(`/profile/update/${profileId}`, newProfile)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка изменения профиля')
  }
}

const ProfileService = {
  getProfile,
  getProfileByUserId,

  updateAvatar,

  updateProfile
}

export default ProfileService
