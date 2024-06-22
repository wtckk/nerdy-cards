import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(8, { message: 'Пароль должен быть не менее 8 символов' })
  @MaxLength(24, { message: 'Пароль долженб быть не более 24 символов' })
  password: string;
}
