import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateCardDto } from '../../card/dtos/create-card.dto';

/**
 * DTO для показа данных Папки
 */
export class FolderDto {
  @ApiProperty({
    description: 'Уникальный идентификатор папки (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'Английский язык IT',
    description: 'Название папки для изучения',
  })
  title: string;

  @ApiProperty({
    example: 'Слова для 3 аттестации',
    description: 'Описание предназначения папки',
  })
  description?: string;

  @ApiProperty({
    description: 'Карточки папки',
    type: [CreateCardDto],
  })
  cards: CreateCardDto[];

  @ApiProperty({
    description: 'Количество карточек папки',
  })
  cardCount: number;
}
