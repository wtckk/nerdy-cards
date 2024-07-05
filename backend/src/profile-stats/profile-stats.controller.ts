import { Controller, Get, Param, Put } from '@nestjs/common';
import { ProfileStatsService } from './profile-stats.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileStats } from './entities/profile-stats.entity';

@ApiTags('Статистика пользователя')
@ApiBearerAuth()
@Controller('profile-stats')
export class ProfileStatsController {
  constructor(private readonly profileStatsService: ProfileStatsService) {}

  @Put('calculate/:profileId')
  calculateStats(@Param('profileId') profileId: string): Promise<ProfileStats> {
    return this.profileStatsService.calculateStats(profileId);
  }

  @Get('get-by-profile-id/:profileId')
  getByProfileId(@Param('profileId') profileId: string): Promise<ProfileStats> {
    return this.profileStatsService.getStatsByProfileId(profileId);
  }
}
