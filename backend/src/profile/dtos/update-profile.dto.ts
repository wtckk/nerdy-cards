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
  @IsString()
  @IsOptional()
  group?: string;

  @ApiProperty({
    example: 'ВШЦТ',
    description: 'Университет пользователя',
  })
  @IsString()
  @IsOptional()
  university?: string;
}
