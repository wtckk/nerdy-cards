import { User } from './User'

interface Success {
  status: number
  massage: string
}

interface AuthResponse {
  accessToken: string
  user: User
}

export { AuthResponse, Success }
