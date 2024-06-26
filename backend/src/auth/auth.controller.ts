import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from '../user/dtos/register.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from '../user/dtos/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { SuccessResponseDto } from '../utils/response.dto';
import { AuthResult } from '../utils/types/auth-result.types';

@ApiTags('Аунтефикация')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('signup')
  async signUp(
    @Body() registerDto: RegisterUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResult> {
    const { accessToken, refreshToken, user } =
      await this.authService.signUp(registerDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30d
    });

    return { accessToken, user };
  }

  @ApiOperation({ summary: 'Логин пользователя' })
  @Post('login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResult> {
    const { accessToken, refreshToken, user } =
      await this.authService.signIn(userDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30d
    });

    return { accessToken, user };
  }

  @ApiOperation({ summary: 'Обновление токена' })
  @Get('refresh-tokens')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies; // Получение рефреш токена из куков
    const tokens = await this.authService.refreshTokens(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30d
    });

    return res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: tokens.user,
    });
  }

  @ApiOperation({ summary: 'Удаление refresh токена' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SuccessResponseDto> {
    const { refreshToken } = req.cookies; // Получение рефреш токена из куков
    res.clearCookie('refreshToken'); // Очищение куков

    return await this.authService.logout(refreshToken);
  }
}
