import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FolderLikeService } from './folder-like.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLikeFolderDto } from './dtos/create-like-folder.dto';
import { SuccessResponseDto } from '../utils/response.dto';

@ApiTags('Лайки модуля')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('folder-like')
export class FolderLikeController {
  constructor(private readonly folderLikeSerivce: FolderLikeService) {}

  @Post('toggle')
  toggleLike(@Body() dto: CreateLikeFolderDto): Promise<SuccessResponseDto> {
    return this.folderLikeSerivce.toggleLike(dto.folderId, dto.profileId);
  }
}
