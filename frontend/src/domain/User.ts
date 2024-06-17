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

  group?: string
  university?: string
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

export { User, Profile, LoginUser, RegistrationUser }
