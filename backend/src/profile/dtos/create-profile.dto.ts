/**
 * DTO для создания профиля пользователя
 */
export class CreateProfileDto {
  username: string;
  group?: string;
  university?: string;
}
