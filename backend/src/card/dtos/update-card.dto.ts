import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для обновления данных карточек
 */
export class UpdateCardDto {
  @ApiProperty({
    description: 'Уникальный идентификатор карточки UUID',
  })
  @IsUUID(4, { message: 'Неверный формат ID' })
  id: string;

  @ApiProperty({
    example: 'Русский',
    description: 'Термин',
  })
  @IsString({ message: 'Термин должен быть строкой' })
  @MinLength(1, { message: 'Термин должен быть не менее 1 символа' })
  @MaxLength(255, { message: 'Термин должен быть не более 255 символов' })
  @IsOptional()
  term?: string;

  @ApiProperty({
    example: 'Russian',
    description: 'Определение',
  })
  @IsString({ message: 'Определение должно быть строкой' })
  @IsOptional()
  @MinLength(1, { message: 'Определение должно быть не менее 1 символа' })
  @MaxLength(255, { message: 'Определение должно быть не более 255 символов' })
  definition?: string;

  @ApiProperty({
    description: 'Позиция карточки в папке',
  })
  @IsNumber({}, { message: 'Позиция должна быть числом' })
  @IsOptional()
  position?: number;
}
