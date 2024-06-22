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
  UsePipes,
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
import { FileValidationPipe } from '../common/pipes/file-validation.pipe';

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
  @Get('id/:profileId')
  getProfile(@Param('profileId') profileId: string): Promise<Profile> {
    return this.profileService.getProfile(profileId);
  }

  @ApiOperation({ summary: 'Получение профиля по ID ползователя' })
  @Get('by-user-id/:userId')
  getProfileByUserId(@Param('userId') userId: string): Promise<Profile> {
    return this.profileService.getProfileByUserId(userId);
  }

  @ApiOperation({ summary: 'Обновление данных профиля' })
  @Put('update/:profileId')
  updateProfile(
    @Param('profileId') profileId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<SuccessResponseDto> {
    return this.profileService.updateProfile(profileId, dto);
  }

  @ApiOperation({ summary: 'Загрузка аватарки профиля' })
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
  @UsePipes(FileValidationPipe)
  @Post('avatar/:profileId')
  updateAvatar(
    @Param('profileId') profileId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.profileService.updateAvatar(profileId, file);
  }
}
