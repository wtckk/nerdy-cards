import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { S3Module } from '../s3/s3.module';
import { FolderModule } from '../folder/folder.module';
import { ProfileStatsModule } from '../profile-stats/profile-stats.module';
import { ProfileStats } from '../profile-stats/entities/profile-stats.entity';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    TypeOrmModule.forFeature([Profile, ProfileStats]),
    S3Module,
    forwardRef(() => FolderModule),
    ProfileStatsModule,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
