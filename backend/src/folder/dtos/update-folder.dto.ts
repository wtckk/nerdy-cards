import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO для обновления данных о Folder
 */
export class UpdateFolderDto {
  @ApiProperty({
    example: 'Английский язык IT',
    description: 'Название папки для изучения',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Слова для 3 аттестации',
    description: 'Описание предназначения паки',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
