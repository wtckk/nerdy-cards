import { $api, handleError } from '@/http'
import { AxiosError } from 'axios'

import { Module } from '@/domain/Module'
import { Success } from '@/domain/Responses'

const getModules = async (): Promise<Module[] | Error> => {
  try {
    const response = await $api.get<Module[]>(`/folder/all`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка получения модулей')
  }
}

const getUserModules = async (id: string): Promise<Module[] | Error> => {
  try {
    const response = await $api.get<Module[]>(`/folder/user/${id}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка получения модулей пользователя')
  }
}

const getModuleById = async (moduleId: string, profileId: string): Promise<Module | Error> => {
  try {
    const response = await $api.get<Module>(`/folder/get-with-progress/${moduleId}/${profileId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка получения модуля пользователя')
  }
}

const createModule = async (newModule: object): Promise<Module | Error> => {
  try {
    const response = await $api.post<Module>(`/folder/create`, newModule)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка создания модуля')
  }
}

const toggleLike = async (folderId: string, profileId: string): Promise<Success | Error> => {
  try {
    const response = await $api.post<Success>(`/folder-like/toggle`, {
      folderId,
      profileId
    })
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка изменения статуса лайка')
  }
}

const publishModule = async (moduleId: string): Promise<Success | Error> => {
  try {
    const response = await $api.patch<Success>(`/folder/publish/${moduleId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка изменения статуса модуля')
  }
}

const ModuleService = {
  getModules,
  getUserModules,
  getModuleById,

  createModule,
  toggleLike,

  publishModule
}

export default ModuleService
