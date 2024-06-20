import { User } from './User'

interface AuthResponse {
  accessToken: string
  user: User
}

export { AuthResponse }
