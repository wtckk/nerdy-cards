import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { SuccessResponseDto } from '../utils/response.dto';
import { Profile } from './entities/profile.entity';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @ApiOperation({ summary: 'Получение профиля по ID ползователя' })
  @Get('by-user-id/:id')
  getProfileByUserId(@Param('id') userId: string): Promise<Profile> {
    return this.profileService.getProfileByUserId(userId);
  }

  @ApiOperation({ summary: 'Обновление' })
  @Put('update/:id')
  updateProfile(
    @Param('id') profileId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<SuccessResponseDto> {
    return this.profileService.updateProfile(profileId, dto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('avatar/:profileId')
  updateAvatar(
    @Param('profileId') profileId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.profileService.updateAvatar(profileId, file);
  }
}
