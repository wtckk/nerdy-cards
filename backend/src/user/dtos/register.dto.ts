import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO для регистрации пользователя
 */
export class RegisterUserDTO {
  @ApiProperty({
    example: 'user',
    description: 'Уникальное имя пользователя',
  })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя пользователя обязательно' })
  @MinLength(4, {
    message: 'Имя пользователя должно быть не менее 4 символов',
  })
  @MaxLength(32, {
    message: 'Имя пользователя должно быть не более 32 символов',
  })
  username: string;

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
