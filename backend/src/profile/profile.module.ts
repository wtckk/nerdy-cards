import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { S3Module } from '../s3/s3.module';
import { FolderModule } from '../folder/folder.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    TypeOrmModule.forFeature([Profile]),
    S3Module,
    forwardRef(() => FolderModule),
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
