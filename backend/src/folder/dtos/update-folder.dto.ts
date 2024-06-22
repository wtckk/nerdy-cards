import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO для обновления данных о Folder
 */
export class UpdateFolderDto {
  @ApiProperty({
    example: 'Английский язык IT',
    description: 'Название папки для изучения',
  })
  @IsString({ message: 'Названия модуля должно быть строкой' })
  @IsNotEmpty({ message: 'Название модуля обязателно' })
  @MinLength(4, {
    message: 'Название модуля должно быть не менее 4 символов',
  })
  @MaxLength(32, {
    message: 'Название модуля должно быть не более 32 символов',
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Слова для 3 аттестации',
    description: 'Описание предназначения паки',
  })
  @IsString({ message: 'Описание модуля должно быть строкой' })
  @MaxLength(200, {
    message: 'Описание модуля должно быть не более 200 символов',
  })
  @IsOptional()
  @IsOptional()
  description?: string;
}
