import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { SuccessResponseDto } from '../utils/response.dto';
import { createSuccessResponse } from '../utils/utils';
import { S3Service } from '../s3/s3.service';
import { AVATAR_FOLDER } from '../common/constants/s3.constants';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly s3Service: S3Service,
  ) {}

  /**
   * Создание профиля
   */
  async createProfile(user: User): Promise<Profile> {
    const profile = this.profileRepository.create({
      username: user.username,
      user,
    });
    return await this.profileRepository.save(profile);
  }

  /**
   * Получение всех профилей
   * Доступно администраторам
   */
  async getAllProfiles(): Promise<Profile[]> {
    const profiles = await this.profileRepository.find({
      relations: ['user'],
    });
    return profiles;
  }

  /**
   * Получение профиля пользователя по ID профиля
   */
  async getProfile(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['folders'],
    });

    if (!profile) {
      throw new NotFoundException({
        message: 'ID не существует',
        status: HttpStatus.NOT_FOUND,
      });
    }
    return profile;
  }

  /**
   * Получение профиля по userID
   */
  async getProfileByUserId(userId: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['folders'],
    });
    if (!profile) {
      throw new NotFoundException({
        message: 'ID не существует',
        status: HttpStatus.NOT_FOUND,
      });
    }
    return profile;
  }

  /**
   * Обновление данных профиля
   */
  async updateProfile(
    id: string,
    dto: UpdateProfileDto,
  ): Promise<SuccessResponseDto> {
    const profile = await this.getProfile(id);

    if (!profile) {
      throw new BadRequestException({
        message: 'ID не существует',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    await this.profileRepository.save({ ...profile, ...dto });

    return createSuccessResponse('Профиль успешно обновлен');
  }

  async updateAvatar(
    profileId: string,
    file: Express.Multer.File,
  ): Promise<any> {
    // Путь для хранения авторки пользователя
    const filePath = `${AVATAR_FOLDER}/${profileId}/`;

    const s3Response = await this.s3Service.uploadAvatar(file.buffer, filePath);

    const profile = await this.getProfile(profileId);

    await this.profileRepository.save({
      ...profile,
      avatarUrl: s3Response.Location,
    });
    return s3Response.Location;
  }
}
