import { UserDto } from '../../user/dtos/user.dto';

/**
 * Тип для возвращения сервисам авторизации
 */
export type AuthResult = {
  accessToken: string;
  refreshToken?: string;
  user: UserDto;
};
