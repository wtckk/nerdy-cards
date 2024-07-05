import { $api, handleError } from '@/http'
import { AxiosError } from 'axios'

import { Success } from '@/domain/Responses'
import { ProfileStats } from '@/domain/User'

const getProfileStats = async (profileId: string): Promise<ProfileStats | Error> => {
  try {
    const response = await $api.get<ProfileStats>(`/profile-stats/get-by-profile-id/${profileId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка получения статистики профиля')
  }
}

const updateProfileStats = async (profileId: string): Promise<ProfileStats | Error> => {
  try {
    const response = await $api.put<ProfileStats>(`/profile-stats/calculate/${profileId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка обновления статистики профиля')
  }
}

const ProfileStatsService = {
  getProfileStats,

  updateProfileStats
}

export default ProfileStatsService
