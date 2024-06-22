import { HttpStatus } from '@nestjs/common';
import { SuccessResponseDto } from './response.dto';

/**
 * Отправка HttpResponse
 */
export const createSuccessResponse = (message: string): SuccessResponseDto => ({
  status: HttpStatus.OK,
  message,
});
