import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Декоратор для получения данных о пользователя из JWT
 */
export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
