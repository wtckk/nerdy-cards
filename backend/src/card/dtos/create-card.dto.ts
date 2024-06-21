import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания карточки совместно с созданием папки
 */
export class CreateCardDto {
  @ApiProperty({
    example: 'Английский',
    description: 'Термин',
  })
  @IsNotEmpty()
  term: string;

  @ApiProperty({
    example: 'English',
    description: 'Определение термина',
  })
  @IsNotEmpty()
  definition: string;

  @ApiProperty({
    example: '1',
    description: 'Позиция определения с термином',
  })
  @IsNumber()
  position: number;

  @IsUUID()
  folderId: string;
}
