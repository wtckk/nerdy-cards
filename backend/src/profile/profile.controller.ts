import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { SuccessResponseDto } from '../utils/response.dto';
import { Profile } from './entities/profile.entity';

@ApiTags('Профиль пользователя')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Получения списка всех профилей' })
  @Get()
  getAllProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  @ApiOperation({ summary: 'Получения профиля по ID профиля' })
  @Get('id/:id')
  getProfile(@Param('id') profileId: string): Promise<Profile> {
    return this.profileService.getProfile(profileId);
  }
  @ApiOperation({ summary: 'Обновление' })
  @Put('update/:id')
  updateProfile(
    @Param('id') profileId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<SuccessResponseDto> {
    return this.profileService.updateProfile(profileId, dto);
  }
}
