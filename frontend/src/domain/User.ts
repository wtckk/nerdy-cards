import { Module } from './Module'
import UserRoles from './Roles'

interface User {
  id: string
  username: string
  email: string
  role: UserRoles
}

interface Profile {
  id: string
  userId: string
  username: string
  createdAt: Date

  group?: string
  university?: string
  folders?: Module[]
  avatarUrl?: string
}

interface LoginUser {
  email: string
  password: string
}

interface RegistrationUser {
  username: string
  email: string
  password: string
}

interface ProfileStats {
  id: string
  foldersCreated: number
  likesCount: number
  cardsCreated: number
  cardsLearned: number
  cardsNotLearned: number
  profile: Profile
}

export { User, Profile, LoginUser, RegistrationUser, ProfileStats }
