import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания карточки совместно с созданием папки
 */
export class CreateCardDto {
  @ApiProperty({
    example: 'Английский',
    description: 'Термин',
  })
  @IsString({ message: 'Термин должен быть строкой' })
  @MinLength(1, { message: 'Термин должен быть не менее 1 символа' })
  @MaxLength(255, { message: 'Термин должен быть не более 255 символов' })
  @IsOptional()
  term?: string;

  @ApiProperty({
    example: 'English',
    description: 'Определение термина',
  })
  @IsString({ message: 'Определение должно быть строкой' })
  @IsOptional()
  @MinLength(1, { message: 'Определение должно быть не менее 1 символа' })
  @MaxLength(255, { message: 'Определение должно быть не более 255 символов' })
  definition?: string;

  @ApiProperty({
    example: '1',
    description: 'Позиция карточки в папке',
  })
  @IsNumber({}, { message: 'Позиция должна быть числом' })
  position: number;
}
