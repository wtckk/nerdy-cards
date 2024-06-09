import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { RegisterUserDTO } from './dtos/register.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Получения списка всех пользователей (Роль ADMIN)
   */
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => plainToClass(UserDto, user));
  }

  /**
   * Получение пользователя по ID
   */
  async getUserById(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException({
        message: 'ID не существует',
        status: HttpStatus.NOT_FOUND,
      });
    }

    return plainToClass(UserDto, user);
  }

  /**
   * Получение пользователя по EMAIL
   */
  getUserByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOneBy({ email });
    return user;
  }

  /**
   * Создание пользователя
   */
  createUser(userDto: RegisterUserDTO): Promise<User> {
    try {
      const user = this.usersRepository.create(userDto);
      return this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
