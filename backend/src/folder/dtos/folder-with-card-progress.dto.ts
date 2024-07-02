import { ApiProperty } from '@nestjs/swagger';
import { CardWithProgressDto } from '../../card/dtos/card-with-progress.dto';
import { Type } from 'class-transformer';
import { ProfileDto } from '../../profile/dtos/profile.dto';

/**
 * DTO для показа данных Папки
 */
export class FolderWithCardProgressDto {
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

  @Type(() => ProfileDto)
  profile: ProfileDto;

  @ApiProperty({
    description: 'Карточки папки',
    type: [CardWithProgressDto],
  })
  @Type(() => CardWithProgressDto)
  cards: CardWithProgressDto[];

  @ApiProperty({
    description: 'Статус папки для публикации',
  })
  isPublic: boolean;

  @ApiProperty({
    description: 'Количество лайков',
  })
  likeCount: number;
}
