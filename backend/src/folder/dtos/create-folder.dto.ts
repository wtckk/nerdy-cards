import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateCardDto } from '../../card/dtos/create-card.dto';
import { Type } from 'class-transformer';

/**
 * DTO для создания FOLDER
 */
export class CreateFolderDto {
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
  title: string;

  @ApiProperty({
    example: 'Слова для 3 аттестации',
    description: 'Описание предназначения паки',
  })
  @IsString({ message: 'Описание модуля должно быть строкой' })
  @MaxLength(200, {
    message: 'Описание модуля должно быть не более 200 символов',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Карточки модуля',
    type: [CreateCardDto],
  })
  @IsArray({ message: 'Карточки должно быть массивом' })
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'Модуль должен содержать хотя бы одну карточку' })
  @Type(() => CreateCardDto)
  cards: CreateCardDto[];
}
