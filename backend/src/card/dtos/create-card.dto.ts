import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания карточки совместно с созданием папки
 */
export class CreateCardDto {
  @ApiProperty({
    example: 'Английский',
    description: 'Термин',
  })
  @IsString()
  @IsOptional()
  term?: string;

  @ApiProperty({
    example: 'English',
    description: 'Определение термина',
  })
  @IsString()
  @IsOptional()
  definition?: string;

  @ApiProperty({
    example: '1',
    description: 'Позиция определения с термином',
  })
  @IsNumber()
  position: number;

  @IsUUID()
  folderId: string;
}
