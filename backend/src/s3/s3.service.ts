import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EasyYandexS3 from 'easy-yandex-s3';

@Injectable()
export class S3Service {
  private s3: EasyYandexS3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY'),
      },
      Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
      debug: true,
    });
  }

  async uploadAvatar(fileBuffer: Buffer, filePath: string): Promise<any> {
    const s3Response = this.s3.Upload({ buffer: fileBuffer }, filePath);
    return s3Response;
  }
}
