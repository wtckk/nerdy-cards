import { defineStore } from 'pinia'

import ModuleService from '@/services/ModuleService'

import { Card, Module } from '@/domain/Module'
import { User } from '@/domain/User'

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
    }
  },
  actions: {
    async createModule(title: string, description: string) {
      const newModule = {
        title: title,
        description: description
      }

      const response = await ModuleService.createModule(newModule)

      if (response instanceof Error) {
        console.log('Система', response.message)
      } else {
        this.modules.push(response)
      }
    },

    async saveCards(cards: Card[]) {
      this.cards = cards
    }
  }
})
