import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entites/folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UserDto } from '../user/dtos/user.dto';
import { FolderDto } from './dtos/folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  /**
   * Получение списка всех созданных папок
   */
  getAllFolder(): Promise<FolderDto[]> {
    const folders = this.folderRepository.find();
    return folders;
  }

  /**
   * Получение папки по ID
   */
  async getFolderById(id: string) {
    const folder = await this.folderRepository.findOneBy({ id });
    return folder;
  }

  /**
   * Создание папки
   */
  async createFolder(dto: CreateFolderDto, user: UserDto) {
    const folder = this.folderRepository.create({
      ...dto,
      userId: user.id,
    });
    return await this.folderRepository.save(folder);
  }

  /**
   * Обновление данных папок
   */
  async updateFolder(id: string, dto: UpdateFolderDto) {
    const folder = await this.getFolderById(id);
    if (!folder) {
      throw new NotFoundException({
        message: 'ID не существует',
        status: HttpStatus.NOT_FOUND,
      });
    }
    await this.folderRepository.save({ ...folder, ...dto });
    return {
      message: 'Успешное обновление',
      status: HttpStatus.OK,
    };
  }
}
