import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FolderLike } from './entities/folder-like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessResponseDto } from '../utils/response.dto';
import { createSuccessResponse } from '../utils/utils';

@Injectable()
export class FolderLikeService {
  constructor(
    @InjectRepository(FolderLike)
    private readonly folderLikeRepository: Repository<FolderLike>,
  ) {}

  /**
   * Like/Dislike модуля
   */
  async toggleLike(
    folderId: string,
    profileId: string,
  ): Promise<SuccessResponseDto> {
    const like = await this.folderLikeRepository.findOne({
      where: {
        folder: { id: folderId },
        profile: { id: profileId },
      },
    });

    if (like) {
      // Если лайк уже существует, то удаляем его
      await this.folderLikeRepository.remove(like);
      return createSuccessResponse('Лайк успешно удален');
    } else {
      // Если лайка нет, то создаем его
      const likeCreated = this.folderLikeRepository.create({
        folder: { id: folderId },
        profile: { id: profileId },
      });
      await this.folderLikeRepository.save(likeCreated);
      return createSuccessResponse('Лайк успешно добавлен');
    }
  }

  /**
   * Получение лайков папки
   */
  async getLikeCount(folderId: string): Promise<number> {
    return this.folderLikeRepository.count({
      where: {
        folder: { id: folderId },
      },
    });
  }
}
