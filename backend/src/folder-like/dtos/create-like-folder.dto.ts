import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания модели Like папки пользователем
 */
export class CreateLikeFolderDto {
  @ApiProperty({ description: 'Уникальный идентификатор профиля (UUID)' })
  profileId: string;

  @ApiProperty({ description: 'Уникальный идентификатор модуля (UUID)' })
  folderId: string;
}
