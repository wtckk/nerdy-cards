import UserRoles from './Roles'

interface User {
  id: string
  username: string
  email: string
  role: UserRoles
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

export { User, LoginUser, RegistrationUser }
