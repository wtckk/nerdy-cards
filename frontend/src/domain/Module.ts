import { Profile } from './User'

type ModulesType = 'My' | 'New'

interface Module {
  id: string
  title: string
  description: string
  profile: Profile
  createdAt: Date
  updatedAt: Date

  cards?: Card[]
}

interface Card {
  id: string
  term: string
  definition: string
  position: number
}

export { Module, Card, ModulesType }
