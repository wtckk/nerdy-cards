import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO для авторизации пользователя
 */
export class LoginUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Уникальный почтовый адрес пользователя',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Пароль пользователя',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
