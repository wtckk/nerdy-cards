import User from './User'

type ModulesType = 'My' | 'New'

interface Module {
  id: string
  title: string
  description: string
  user: User
  createdAt: Date
  updatedAt: Date
}

export { Module, ModulesType }
