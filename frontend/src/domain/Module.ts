import { Profile } from './User'

type ModulesType = 'My' | 'New'

interface Module {
  id: string
  title: string
  description: string
  profile: Profile
  createdAt: Date
  updatedAt: Date
}

export { Module, ModulesType }
