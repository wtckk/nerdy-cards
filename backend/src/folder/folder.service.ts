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
import { FolderWithCardProgressDto } from './dtos/folder-with-card-progress.dto';
import { UserDto } from '../user/dtos/user.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    private readonly profileService: ProfileService,
    private readonly cardService: CardService,
  ) {}

  /**
   * Получение списка всех опубликованных папок (отсортированные)
   * Доступно всем пользователям
   * Используем QueryBuilder для подсчета количества карточек папки
   */
  async getAllPublicFolder(): Promise<FolderDto[]> {
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .leftJoinAndSelect('folder.profile', 'profile')
      .loadRelationCountAndMap('folder.cardCount', 'folder.cards')
      .loadRelationCountAndMap('folder.likeCount', 'folder.likes')
      .where('folder.isPublic = :isPublic', { isPublic: true })
      .groupBy('folder.id')
      .orderBy('folder.createdAt', 'DESC')
      .getMany();
    return folders.map((folder) => plainToClass(FolderDto, folder));
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
      .loadRelationCountAndMap('folder.likeCount', 'folder.likes')
      .where('folder.profileId = :profileId', { profileId: profile.id })
      .groupBy('folder.id')
      .orderBy('folder.createdAt', 'DESC')
      .getMany();
    return folders.map((folder) => plainToClass(FolderDto, folder));
  }

  /**
   * Получение папки по folderId
   */
  async getFolderById(folderId: string) {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId },
      relations: ['profile', 'profile.user'],
    });

    if (!folder) {
      throw new NotFoundException({
        message: 'Папка не найдена',
        status: HttpStatus.NOT_FOUND,
      });
    }
    return folder;
  }

  /**
   * Получение папки по ID c прогрессом для конкретного пользователя
   */
  async getFolderWithProgressCardById(
    folderId: string,
    profileId: string,
  ): Promise<FolderWithCardProgressDto> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId },
      relations: [
        'profile',
        'cards',
        'cards.progress',
        'cards.progress.profile',
        'likes',
      ],
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

    // Фильтруем прогресс только для текущего пользователя
    folder.cards.forEach((card) => {
      card.progress = card.progress.filter(
        (progress) => progress.profile.id === profileId,
      );
    });

    return plainToClass(FolderWithCardProgressDto, {
      ...folder,
      cards: folder.cards.map((card) => ({
        ...card,
        isLearned:
          card.progress.length > 0 ? card.progress[0].isLearned : false,
      })),
      likeCount: folder.likes.length,
    });
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
