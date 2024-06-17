import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * DTO для получения данных о Папке
 */
export class FolderDto {
  @ApiProperty({
    example: '',
    description: 'Уникальный идентификатор папки (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'Английский язык IT',
    description: 'Название папки для изучения',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Слова для 3 аттестации',
    description: 'Описание предназначения паки',
  })
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
