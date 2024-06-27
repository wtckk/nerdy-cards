import { ApiProperty } from '@nestjs/swagger';

export class CardDto {
  @ApiProperty({
    description: 'Уникальный идентификатор карточки UUID',
  })
  id: string;

  @ApiProperty({
    example: 'Английский',
    description: 'Термин',
  })
  term?: string;

  @ApiProperty({
    example: 'English',
    description: 'Определение термина',
  })
  definition?: string;

  @ApiProperty({
    example: '1',
    description: 'Позиция карточки в папке',
  })
  position: number;
}
