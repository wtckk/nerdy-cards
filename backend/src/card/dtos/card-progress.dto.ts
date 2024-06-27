import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

/**
 * DTO для создания прогресса у карточек
 */
export class CardProgressDto {
  @ApiProperty({
    description: 'Уникальный идентификатор карточки UUID',
  })
  @IsUUID(4, { message: 'Неверный формат ID' })
  id: string;

  @ApiProperty({
    description: 'Статус изучения карточек',
  })
  @IsBoolean()
  isLearned: boolean;
}
