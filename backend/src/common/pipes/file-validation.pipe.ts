import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ALLOWED_MIME_TYPES, AVATAR_MAX_SIZE } from '../constants/s3.constants';

/**
 * Pipe для валидации фотографий
 */
@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File): any {
    if (!value) {
      throw new BadRequestException({
        message: 'Файл не найден',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    // Проверка на допустимый размер файла
    if (value.size > AVATAR_MAX_SIZE) {
      throw new BadRequestException({
        message: `Размер файла превышает ${AVATAR_MAX_SIZE / 1024 / 1024} МБ`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    if (!ALLOWED_MIME_TYPES.includes(value.mimetype)) {
      throw new BadRequestException({
        message: 'Недопустимый тип файла',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return value;
  }
}
