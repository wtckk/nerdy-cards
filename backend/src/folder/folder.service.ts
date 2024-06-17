import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entites/folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { FolderDto } from './dtos/folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { ProfileService } from '../profile/profile.service';

// TODO: переписать создание папок с использованием профиля
@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Получение списка всех созданных папок (отсортированные)
   */
  async getAllFolder(): Promise<Folder[]> {
    const folders = await this.folderRepository.find({
      order: {
        createdAt: 'desc',
      },
      relations: ['profile'],
    });
    return folders;
  }

  /**
   * Получение папок пользователя (отсортированные)
   */
  async getFolderByUser(userId: string): Promise<FolderDto[]> {
    const profile = await this.profileService.getProfileByUserId(userId);
    const folders = await this.folderRepository.find({
      where: {
        profile: {
          id: profile.id,
        },
      },
      order: {
        createdAt: 'desc',
      },
    });
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
  async createFolder(dto: CreateFolderDto, userId: string) {
    const profile = await this.profileService.getProfileByUserId(userId);
    const folder = this.folderRepository.create({
      ...dto,
      profile: {
        id: profile.id,
      },
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
