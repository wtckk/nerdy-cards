import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDTO } from '../user/dtos/register.dto';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../user/dtos/login.dto';
import { RefreshToken } from './entitites/refresh-token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Регистрация пользователя
   */
  async signUp(userDto: RegisterUserDTO): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, username, password } = userDto;
    const existUser = await this.usersService.getUserByEmail(email);

    // Проверка на существования пользователя с соответствующими данными
    if (existUser) {
      throw new BadRequestException({
        message: 'Ошибка регистрации',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      // Хеширование пароля
      const salt = 10;
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await this.usersService.createUser({
        email,
        username,
        password: hashPassword,
      });
      // Генирорование токенов после успешной регистрации
      const payload = {
        sub: user.id,
        username: user.username,
        email: email,
        role: user.role,
      };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = await this.generateRefreshToken(user);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException({
        message: 'Ошибка регистрации',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Логин пользователя
   */
  async signIn(userDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateUser(userDto);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Неверные данные',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  /**
   * Выход пользователя
   */
  async logout(refreshToken: string): Promise<void> {
    try {
      await this.refreshTokenRepository.delete({ token: refreshToken });
    } catch (error) {
      throw new BadRequestException({
        message: 'Ошибка при удаление токена',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Обновление refreshToken
   */
  async refreshTokens(refreshToken: string): Promise<string> {
    // Проверяем рефреш токен
    const userData = await this.validateRefreshToken(refreshToken);

    // Получаем токен из базы данных
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    });

    if (!token || !userData) {
      throw new UnauthorizedException({
        message: 'Неверный refresh token',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const newRefreshToken = await this.generateRefreshToken(token.user);

    return newRefreshToken;
  }

  /**
   * Валидация данных пользователя
   */
  async validateUser(userDto: LoginUserDto): Promise<any> {
    const { email, password } = userDto;
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   * Генерация REFRESH TOKEN пользователя
   */
  async generateRefreshToken(user: User): Promise<string> {
    try {
      // Получение секрета для refreshToken
      const refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

      const refreshToken = this.refreshTokenRepository.create({
        user,
        token: this.jwtService.sign(
          {
            sub: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          {
            secret: refreshTokenSecret,
            expiresIn: '30d',
          },
        ),
      });
      await this.refreshTokenRepository.save(refreshToken);

      return refreshToken.token;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
  }

  /**
   * Валидация рефреш токена для последуещего использования
   */
  validateRefreshToken(token: string) {
    try {
      const refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
      const userData = this.jwtService.verify(token, {
        secret: refreshTokenSecret,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }
}
