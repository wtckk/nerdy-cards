import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO для регистрации пользователя
 */
export class RegisterUserDTO {
  @ApiProperty({
    example: 'user',
    description: 'Уникальное имя пользователя',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'user@mail.com',
    description: 'Уникальный почтовый адрес пользователя',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Пароль пользователя',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
