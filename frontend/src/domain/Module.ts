import { Profile } from './User'

type ModulesType = 'My' | 'New'

interface Module {
  id: string
  title: string
  description: string
  profile: Profile
  createdAt: Date
  updatedAt: Date
  isPublic: Boolean
  cardCount: number
  likeCount: number
  isLiked?: boolean

  cards?: Card[]
}

interface Card {
  id: string
  term: string
  definition: string
  position: number
  isLearned?: boolean
}

interface progressCard {
  id: string
  isLearned: boolean
}

export { Module, Card, progressCard, ModulesType }
