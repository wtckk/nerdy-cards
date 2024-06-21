/**
 * DTO для получения данных о профиле
 */
export class ProfileDto {
  id: string;
  userId: string;
  username: string;
  group?: string;
  university?: string;
}
