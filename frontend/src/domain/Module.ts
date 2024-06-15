import User from './User'

type ModulesType = 'My' | 'New'

interface Module {
  id: string
  title: string
  description: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export { Module, ModulesType }
