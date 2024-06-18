import { Module } from '@/domain/Module'
import $api from '@/http'

const getModules = async (): Promise<Module[] | Error> => {
  try {
    const response = await $api.get(`/folder/all`)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка получения модулей')
    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const getUserModules = async (id: string): Promise<Module[] | Error> => {
  try {
    const response = await $api.get(`/folder/user/${id}`)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка получения модулей')
    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const createModule = async (newModule: object): Promise<Module | Error> => {
  try {
    const response = await $api.post(`/folder/create`, newModule)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка создания модуля')
    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const ModuleService = {
  getModules,
  getUserModules,

  createModule
}

export default ModuleService
