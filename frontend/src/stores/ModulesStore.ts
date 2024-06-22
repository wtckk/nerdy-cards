import { defineStore } from 'pinia'

import ModuleService from '@/services/ModuleService'

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
          return new Error('Неизвестная ошибка')
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
          return new Error('Неизвестная ошибка')
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
          return new Error('Неизвестная ошибка')
        } else {
          const cards = response.cards
          if (cards) {
            this.cards.push(...cards)
          }

          return response
        }
      }
    }
  },
  actions: {
    async createModule(title: string, description: string, cards: Card[]) {
      const newModule = {
        title: title,
        description: description,
        cards: cards
      }

      const response = await ModuleService.createModule(newModule)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        this.modules.push(response)
        this.cards.push(...cards)
      }

      return response
    },

    async createModuleCard(moduleId: string, newCards: Card[]) {
      const response = await ModuleService.createModuleCard(moduleId, newCards)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        newCards.forEach((card) => {
          if (card.id) {
            this.cards.push(card)
          }
        })
      }

      return response
    },

    async publishModule(moduleId: string) {
      const response = await ModuleService.publishModule(moduleId)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        this.modules = this.modules.map((module) => {
          if (module.id === moduleId) {
            module.isPublic = true
          }
          return module
        })
      }

      return response
    },

    async updateModuleCards(cards: Card[]) {
      const response = await ModuleService.updatedCards(cards)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        this.cards.map((card) => {
          const editedCard = cards.find((c) => {
            return card.id === c.id
          })
          return editedCard
        })
      }

      return response
    },

    async removeModuleCard(deletedCard: Card) {
      const response = await ModuleService.removeModuleCard(deletedCard.id)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        this.cards = this.cards.filter((card) => deletedCard.id !== card.id)
      }

      return response
    }
  }
})
