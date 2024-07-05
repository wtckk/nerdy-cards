import { Module } from '@nestjs/common';
import { ProfileStatsService } from './profile-stats.service';
import { ProfileStatsController } from './profile-stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileStats } from './entities/profile-stats.entity';
import { Profile } from '../profile/entities/profile.entity';

@Module({
  providers: [ProfileStatsService],
  controllers: [ProfileStatsController],
  imports: [TypeOrmModule.forFeature([ProfileStats, Profile])],
  exports: [ProfileStatsService],
})
export class ProfileStatsModule {}
