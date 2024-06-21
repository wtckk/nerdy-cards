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

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  /**
   * Создание профиля
   */
  async createProfile(user: User) {
    const profile = this.profileRepository.create({
      username: user.username,
      user,
    });
    return await this.profileRepository.save(profile);
  }

  /**
   * Получение всех профилей (ADMINS)
   */
  async getAllProfiles() {
    const profiles = await this.profileRepository.find({
      relations: ['user'],
    });
    return profiles;
  }

  /**
   * Получение профиля пользователя по ID профиля
   */
  async getProfile(id: string) {
    const profile = await this.profileRepository.findOneBy({ id });
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
  async getProfileByUserId(userId: string) {
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
  async updateProfile(id: string, dto: UpdateProfileDto) {
    const profile = await this.getProfile(id);

    if (!profile) {
      throw new BadRequestException({
        message: 'ID не существует',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    await this.profileRepository.save({ ...profile, ...dto });

    return {
      message: 'Профиль успешно обновлен',
      status: HttpStatus.OK,
    };
  }
}
