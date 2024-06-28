import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CardProgress } from '../entites/card-progress.entity';

/**
 * DTO для вывода карточки с ее прогрессом
 */
export class CardWithProgressDto {
  @ApiProperty({
    description: 'Уникальный идентификатор карточки UUID',
  })
  id: string;

  @ApiProperty({
    description: 'Термин',
  })
  term: string;

  @ApiProperty({
    description: 'Определение',
  })
  definition: string;

  @ApiProperty({
    description: 'Позиция карточки в папке',
  })
  position: number;

  @Exclude()
  progress?: CardProgress;

  @ApiProperty({
    description: 'Статус изучения карточек',
  })
  @Expose()
  isLearned: boolean;
}
