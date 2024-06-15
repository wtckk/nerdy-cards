import UserRoles from './Roles'

interface User {
  id: string
  username: string
  email: string
  role: UserRoles
}

export default User
