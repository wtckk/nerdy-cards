import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Профиль пользователя')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getAllProfiles() {
    return this.profileService.getAllProfiles();
  }
  @Get('id/:id')
  getProfile(@Param('id') profileId: string) {
    return this.profileService.getProfile(profileId);
  }
}
