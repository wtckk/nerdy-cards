import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileStats } from './entities/profile-stats.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class ProfileStatsService {
  constructor(
    @InjectRepository(ProfileStats)
    private readonly profileStatsRepository: Repository<ProfileStats>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  /**
   * Подсчет статистики пользователя
   */
  async calculateStats(profileId: string): Promise<ProfileStats> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['folders', 'folders.cards', 'cardProgress', 'folderLikes'],
    });
    if (!profile) {
      throw new NotFoundException({
        message: 'Профиль не найден',
        status: HttpStatus.NOT_FOUND,
      });
    }
    const profileStats = await this.profileStatsRepository.findOne({
      where: { profile: { id: profileId } },
    });

    // Подсчитываем различные поля
    const foldersCount = profile.folders.length;
    const likesCount = profile.folderLikes.length;
    const cardsCreated = profile.folders.reduce(
      (sum, folder) => sum + folder.cards.length,
      0,
    );
    const cardsLearned = profile.cardProgress.filter(
      (progress) => progress.isLearned,
    ).length;
    const cardsNotLearned = profile.cardProgress.filter(
      (progress) => !progress.isLearned,
    ).length;

    return await this.profileStatsRepository.save({
      ...profileStats,
      foldersCount: foldersCount,
      likesCount: likesCount,
      cardsLearned: cardsLearned,
      cardsCreated: cardsCreated,
      cardsNotLearned: cardsNotLearned,
    });
  }

  /**
   * Получение статистики пользователя
   */
  async getStatsByProfileId(profileId: string): Promise<ProfileStats> {
    const profileStats = await this.profileStatsRepository.findOne({
      where: { profile: { id: profileId } },
    });
    return profileStats;
  }
}
