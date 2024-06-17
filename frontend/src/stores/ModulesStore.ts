import { defineStore } from 'pinia'

import ModuleService from '@/services/ModuleService'

import { Module } from '@/domain/Module'
import { User } from '@/domain/User'

interface State {
  modules: Module[]
  user: User
  search: string
}

export const useModuleStore = defineStore('moduleStore', {
  state: (): State => ({
    modules: [
      // {
      //   id: '0',
      //   title: 'Module 1',
      //   description: 'description',
      //   userId: '0',
      //   createdAt: new Date('2024-02-01'),
      //   updatedAt: new Date('2024-06-09')
      // },
      // {
      //   id: '1',
      //   title: 'Module 2',
      //   description: 'description',
      //   userId: '0',
      //   createdAt: new Date('2024-02-01'),
      //   updatedAt: new Date('2024-03-11')
      // },
      // {
      //   id: '2',
      //   title: 'Module 3',
      //   description: 'description',
      //   userId: '1',
      //   createdAt: new Date('2024-05-10'),
      //   updatedAt: new Date('2024-05-10')
      // },
      // {
      //   id: '3',
      //   title: 'Module 4',
      //   description: 'description',
      //   userId: '1',
      //   createdAt: new Date('2024-06-01'),
      //   updatedAt: new Date('2024-06-11')
      // },
      // {
      //   id: '4',
      //   title: 'Module 5',
      //   description: 'description',
      //   userId: '1',
      //   createdAt: new Date('2024-06-01'),
      //   updatedAt: new Date('2024-06-11')
      // },
      // {
      //   id: '5',
      //   title: 'Module 6',
      //   description: 'description',
      //   userId: '2',
      //   createdAt: new Date('2024-08-01'),
      //   updatedAt: new Date('2024-09-12')
      // },
      // {
      //   id: '6',
      //   title: 'Module 7',
      //   description: 'description',
      //   userId: '2',
      //   createdAt: new Date('2024-05-01'),
      //   updatedAt: new Date('2024-06-01')
      // },
      // {
      //   id: '7',
      //   title: 'Module 8',
      //   description: 'description',
      //   userId: '2',
      //   createdAt: new Date('2024-04-01'),
      //   updatedAt: new Date('2024-06-10')
      // },
      // {
      //   id: '8',
      //   title: 'Module 9',
      //   description: 'description',
      //   userId: '2',
      //   createdAt: new Date('2024-07-02'),
      //   updatedAt: new Date('2024-07-02')
      // },
      // {
      //   id: '9',
      //   title: 'Module 10',
      //   description: 'description',
      //   userId: '3',
      //   createdAt: new Date('2024-07-01'),
      //   updatedAt: new Date('2024-07-11')
      // }
    ],
    user: {
      id: '93d5035f-1ab7-459a-9124-5de5bce22eb6',
      username: 'user',
      email: 'user@gmail.com',
      role: 'USER'
    },
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
    getMyModules(): Module[] {
      return this.modules.filter((module) => module.userId === this.user.id)
    },
    getNewModules(): Module[] {
      return this.modules.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
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
    }
  }
})
