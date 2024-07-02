import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { RegisterUserDTO } from './dtos/register.dto';
import { plainToClass } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Администратор создается после запуска всего приложения
   */
  async onApplicationBootstrap(): Promise<void> {
    await this.createAdminUser();
  }

  /**
   * Получения списка всех пользователей
   * Доступно администраторам
   */
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => plainToClass(UserDto, user));
  }

  /**
   * Получение пользователя по ID
   * Доступно администраторам
   */
  async getUserById(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException({
        message: 'Пользовтель не найдена',
        status: HttpStatus.NOT_FOUND,
      });
    }

    return plainToClass(UserDto, user);
  }

  /**
   * Получение пользователя по EMAIL
   */
  getUserByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { email },
    });
    return user;
  }

  /**
   * Создание пользователя с ролью USER
   */
  createUser(userDto: RegisterUserDTO): Promise<User> {
    try {
      const user = this.usersRepository.create(userDto);
      return this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Ошибка создания пользователя',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Создание пользователя с ролью ADMIN
   */
  async createAdminUser(): Promise<void> {
    const admin = await this.usersRepository.findOne({
      where: { role: UserRole.ADMIN },
    });

    if (!admin) {
      const username = this.configService.get<string>('USERNAME_ADMIN');
      const email = this.configService.get<string>('EMAIL_ADMIN');
      const password = this.configService.get<string>('EMAIL_PASSWORD');

      const salt = 10;
      const hashPassword = await bcrypt.hash(password, salt);

      const adminCreated = this.usersRepository.create({
        username,
        email,
        password: hashPassword,
        role: UserRole.ADMIN,
      });
      await this.usersRepository.save(adminCreated);
    }
  }
}
