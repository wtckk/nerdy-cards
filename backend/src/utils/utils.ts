import { HttpStatus } from '@nestjs/common';
import { SuccessResponseDto } from './response.dto';

export const createSuccessResponse = (message: string): SuccessResponseDto => ({
  status: HttpStatus.OK,
  message,
});
