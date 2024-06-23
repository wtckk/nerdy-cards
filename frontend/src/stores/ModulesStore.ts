import { defineStore } from 'pinia'

import ModuleService from '@/services/ModuleService'
import CardService from '@/services/CardService'

import { Card, Module } from '@/domain/Module'

interface State {
  modules: Module[]
  myModules: Module[]
  cards: Card[]
  search: string
}

export const useModuleStore = defineStore('moduleStore', {
  state: (): State => ({
    modules: [],
    myModules: [],
    cards: [],
    search: ''
  }),
  getters: {
    getModules() {
      return async () => {
        const response = await ModuleService.getModules()

        if (response instanceof Error) {
          console.error('Ошибка при получении модулей:', response.message)
        } else {
          this.modules = response
          return this.modules
        }
      }
    },
    getUserModules() {
      return async (userId: string) => {
        const response = await ModuleService.getUserModules(userId)

        if (response instanceof Error) {
          console.error('Ошибка при получении модулей пользователя:', response.message)
        } else {
          this.myModules = response
          return this.myModules
        }
      }
    },
    getModuleById() {
      return async (moduleId: string) => {
        const response = await ModuleService.getModuleById(moduleId)

        if (response instanceof Error) {
          console.error('Ошибка при получении модуля по ID:', response.message)
        } else {
          const cards = response.cards
          if (cards) {
            this.cards.push(...cards)
          }
        }
        return response
      }
    }
  },
  actions: {
    async createModule(title: string, description: string, cards: Card[]) {
      const newModule = { title, description, cards }

      const response = await ModuleService.createModule(newModule)

      if (response instanceof Error) {
        console.error('Ошибка при создании модуля:', response.message)
      } else {
        this.modules.push(response)
        this.cards.push(...cards)
      }

      return response
    },

    async createCards(moduleId: string, newCards: Card[]) {
      const response = await CardService.createCards(moduleId, newCards)

      if (response instanceof Error) {
        console.error('Ошибка при создании карточек модуля:', response.message)
      } else {
        this.cards.push(...newCards)
      }
      return response
    },

    async publishModule(moduleId: string) {
      const response = await ModuleService.publishModule(moduleId)

      if (response instanceof Error) {
        console.error('Ошибка при изменении статуса модуля:', response.message)
      } else {
        this.modules = this.modules.map((module) =>
          module.id === moduleId ? { ...module, isPublic: true } : module
        )
      }
      return response
    },

    async updateCards(cards: Card[]) {
      const response = await CardService.updateCards(cards)

      if (response instanceof Error) {
        console.error('Ошибка при обновлении карточек модуля:', response.message)
      } else {
        this.cards = this.cards.map((card) => {
          const editedCard = cards.find((c) => c.id === card.id)
          return editedCard ? editedCard : card
        })
      }
      return response
    },

    async removeCard(cardId: string) {
      const response = await CardService.removeCard(cardId)
      if (response instanceof Error) {
        console.error('Ошибка при удалении карточки модуля:', response.message)
      } else {
        this.cards = this.cards.filter((card) => card.id !== cardId)
      }
      return response
    }
  }
})
