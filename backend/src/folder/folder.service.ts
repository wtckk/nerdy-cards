import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entites/folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { ProfileService } from '../profile/profile.service';
import { CardService } from '../card/card.service';
import { CreateCardDto } from '../card/dtos/create-card.dto';
import { createSuccessResponse } from '../utils/utils';
import { SuccessResponseDto } from '../utils/response.dto';
import { FolderDto } from './dtos/folder.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly profileService: ProfileService,
    private readonly cardService: CardService,
  ) {}

  /**
   * Получение списка всех созданных папок (отсортированные)
   * Доступно всем пользователям
   * Используем QueryBuilder для подсчета количества карточек папки
   */
  async getAllPublicFolder(): Promise<FolderDto[]> {
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .leftJoinAndSelect('folder.profile', 'profile')
      .loadRelationCountAndMap('folder.cardCount', 'folder.cards')
      .where('folder.isPublic = :isPublic', { isPublic: true })
      .groupBy('folder.id')
      .orderBy('folder.createdAt', 'DESC')
      .getMany();
    return plainToClass(FolderDto, folders);
  }

  /**
   * Получение папок пользователя (отсортированные)
   * Доступно всем пользователям
   * Используем QueryBuilder для подсчета количества карточек папки
   */
  async getFolderByUser(userId: string): Promise<FolderDto[]> {
    const profile = await this.profileService.getProfileByUserId(userId);
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .leftJoinAndSelect('folder.profile', 'profile')
      .loadRelationCountAndMap('folder.cardCount', 'folder.cards')
      .where('folder.profileId = :profileId', { profileId: profile.id })
      .groupBy('folder.id')
      .orderBy('folder.createdAt', 'DESC')
      .getMany();
    return plainToClass(FolderDto, folders);
  }

  /**
   * Получение папки по ID
   */
  async getFolderById(folderId: string): Promise<FolderDto> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId },
      relations: ['profile', 'cards'],
      order: {
        cards: {
          position: 'asc',
        },
      },
    });
    if (!folder) {
      throw new NotFoundException({
        message: 'Папка не найдена',
        status: HttpStatus.NOT_FOUND,
      });
    }
    return plainToClass(FolderDto, folder);
  }

  /**
   * Создание папки вместе с карточками
   */
  async createFolder(dto: CreateFolderDto, userId: string): Promise<Folder> {
    const profile = await this.profileService.getProfileByUserId(userId);
    try {
      const folder = this.folderRepository.create({
        title: dto.title,
        description: dto.description,
        profile: profile,
      });
      const savedFolder = await this.folderRepository.save(folder);

      // Проверяем на наличие карточек в модуле
      if (dto.cards.length === 0) {
        throw new NotFoundException({
          message: 'Папка не найдена',
          status: HttpStatus.NOT_FOUND,
        });
      }
      // Создаем карточки с использованием folderId
      const cards: CreateCardDto[] = dto.cards.map((cardDto) => ({
        ...cardDto,
        folderId: savedFolder.id,
      }));
      await this.cardService.createCards(cards, savedFolder.id);

      return savedFolder;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ошибка создания пользователя',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Обновление данных папки
   */
  async updateFolder(
    id: string,
    dto: UpdateFolderDto,
  ): Promise<SuccessResponseDto> {
    const folder = await this.getFolderById(id);
    if (!folder) {
      throw new NotFoundException({
        message: 'Папка не найдена',
        status: HttpStatus.NOT_FOUND,
      });
    }
    await this.folderRepository.save({ ...folder, ...dto });
    return createSuccessResponse('Папка успешно обновлена');
  }

  /**
   * Изменение статуса Public у Folder
   */
  async publishFolder(folderId: string): Promise<SuccessResponseDto> {
    const folder = await this.getFolderById(folderId);

    // Инвертируем значение isPublic
    folder.isPublic = !folder.isPublic;

    await this.folderRepository.save(folder);
    return createSuccessResponse('Конфиденциальность папки успешно обновлена');
  }
}
