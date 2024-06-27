import { $api, handleError } from '@/http'
import { AxiosError } from 'axios'

import { Card, progressCard } from '@/domain/Module'
import { Success } from '@/domain/Responses'

const getProgressCards = async (profileId: string, moduleId: string): Promise<Card[] | Error> => {
  try {
    const response = await $api.get<Card[]>(`/card/progress/by-profile-id/${profileId}/${moduleId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка получения карточек')
  }
}

const createCards = async (moduleId: string, newCards: Card[]): Promise<Card[] | Error> => {
  try {
    const response = await $api.post<Card[]>(`/card/create/${moduleId}`, newCards)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка создания карточек')
  }
}

const updateCards = async (cards: Card[]): Promise<Success | Error> => {
  try {
    const response = await $api.put<Success>(`/card/update`, cards)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка сохранения карточек')
  }
}

const removeCard = async (cardId: string): Promise<Success | Error> => {
  try {
    const response = await $api.delete<Success>(`/card/delete/${cardId}`)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка удаления карточки')
  }
}

const createProgressCards = async (
  profileId: string,
  cards: progressCard[]
): Promise<Card[] | Error> => {
  try {
    const response = await $api.post<Card[]>(`/card/progress/create/${profileId}`, cards)
    return response.data
  } catch (error) {
    return handleError(error as AxiosError, 'Ошибка сохранения данных')
  }
}

const CardService = {
  getProgressCards,

  createCards,
  createProgressCards,

  updateCards,

  removeCard
}

export default CardService
