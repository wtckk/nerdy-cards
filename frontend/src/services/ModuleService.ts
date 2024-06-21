import $api from '@/http'

import { Card, Module } from '@/domain/Module'
import { Success } from '@/domain/Responses'

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

const getModuleById = async (id: string): Promise<Module | Error> => {
  try {
    const response = await $api.get(`/folder/get-by-id/${id}`)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка получения модуля пользователя')
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

const createModuleCard = async (moduleId: string, newCards: Card[]): Promise<Card[] | Error> => {
  try {
    const response = await $api.post(`/card/create/${moduleId}`, newCards)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка создания карточки')
    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}
const updatedCards = async (cards: Card[]): Promise<Success | Error> => {
  try {
    const response = await $api.put(`/card/update`, cards)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка сохранения карточек')
    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}

const publishModule = async (moduleId: string): Promise<Success | Error> => {
  try {
    const response = await $api.patch(`/folder/publish/${moduleId}`)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка изменения статуса модуля')
    if (error instanceof Error) {
      return error
    } else {
      return new Error('Неизвестная ошибка')
    }
  }
}
const removeModuleCard = async (cardId: string): Promise<Success | Error> => {
  try {
    const response = await $api.delete(`/card/delete/${cardId}`)
    return response.data
  } catch (error) {
    console.log(error, 'Ошибка удаения карточек')
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
  getModuleById,

  createModule,
  createModuleCard,

  updatedCards,

  publishModule,

  removeModuleCard
}

export default ModuleService
