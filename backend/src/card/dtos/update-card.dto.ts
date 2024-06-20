import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для обновления данных карточек
 */
export class UpdateCardDto {
  @ApiProperty({
    description: 'Уникальный идентификатор карточки UUID',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'Русский',
    description: 'Термин',
  })
  @IsString()
  @IsOptional()
  term?: string;

  @ApiProperty({
    example: 'Russian',
    description: 'Определение',
  })
  @IsString()
  @IsOptional()
  definition?: string;

  @ApiProperty({
    description: 'Позиция карточки в модуле',
  })
  @IsNumber()
  @IsOptional()
  position?: number;
}
