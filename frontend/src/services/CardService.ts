import { $api, handleError } from '@/http'
import { AxiosError } from 'axios'

import { Card } from '@/domain/Module'
import { Success } from '@/domain/Responses'

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

const CardService = {
  createCards,

  updateCards,

  removeCard
}

export default CardService
