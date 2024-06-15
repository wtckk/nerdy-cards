import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * DTO для создания FOLDER
 */
export class CreateFolderDto {
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
}
