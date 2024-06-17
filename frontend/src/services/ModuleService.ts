import { Module } from '@/domain/Module'
import axios from 'axios'

const getModules = async (): Promise<Module[] | Error> => {
  try {
    const response = await axios.get(`/folder/all`)
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
    const response = await axios.post(`/folder/create`, newModule)
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

  createModule
}

export default ModuleService
