import { FolderDto } from '../../folder/dtos/folder.dto';

/**
 * DTO для отоброжения данных пользователя
 */
export class ProfileDto {
  id: string;

  username: string;

  avatarUrl?: string;

  group?: string;

  university?: string;

  folders: FolderDto[];

  createdAt: Date;
}
