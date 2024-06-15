import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * DTO для получения данных о пользователи
 */
export class UserDto {
  @ApiProperty({
    example: '',
    description: 'Уникальный идентификатор пользователя (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'user',
    description: 'Уникальное имя пользователя',
  })
  username: string;

  @ApiProperty({
    example: 'user@mail.com',
    description: 'Уникальный почтовый адрес пользователя',
  })
  email: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Роль пользователя',
  })
  role: UserRole;

  @Exclude()
  password?: string;
}
