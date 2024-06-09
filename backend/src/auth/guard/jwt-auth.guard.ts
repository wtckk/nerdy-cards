import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard для проверки аунтефицирован ли пользователь
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
