import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

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
   * Получение профилья пользователя
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

  async getProfileByUserId(userId: string) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!profile) {
      throw new NotFoundException({
        message: 'ID не существует',
        status: HttpStatus.NOT_FOUND,
      });
    }
    return profile;
  }
}
