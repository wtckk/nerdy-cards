import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для обновления данных профиля
 */
export class UpdateProfileDto {
  @ApiProperty({
    example: 'ПКТб-22-1',
    description: 'Группа пользователя',
  })
  @IsString({ message: 'Поле "группа" должно быть строкой' })
  @IsOptional()
  group?: string;

  @ApiProperty({
    example: 'ВШЦТ',
    description: 'Университет пользователя',
  })
  @IsString({ message: 'Поле "университет" должно быть строкой' })
  @IsOptional()
  university?: string;
}
