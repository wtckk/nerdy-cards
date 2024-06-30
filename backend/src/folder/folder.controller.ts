import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UserDto } from '../user/dtos/user.dto';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { FolderService } from './folder.service';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { SuccessResponseDto } from '../utils/response.dto';
import { Folder } from './entites/folder.entity';
import { FolderDto } from './dtos/folder.dto';
import { FolderWithCardProgressDto } from './dtos/folder-with-card-progress.dto';
import { OwnerInterceptor } from '../common/interceptors/owner.interceptor';

@ApiTags('Работа с папками')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiOperation({
    summary: 'Получение всех опубликованных папок пользователей',
  })
  @ApiResponse({ type: [FolderDto] })
  @Get('all')
  getAllPublicFolders(): Promise<FolderDto[]> {
    return this.folderService.getAllPublicFolder();
  }

  @ApiOperation({
    summary: 'Получение всех папок конкретного пользователя по userId',
  })
  @ApiResponse({ type: [FolderDto] })
  @Get('user/:userId')
  getAllFolderUser(@Param('userId') userId: string): Promise<FolderDto[]> {
    return this.folderService.getFolderByUser(userId);
  }

  @ApiOperation({
    summary: 'Создание папки, вместе с карточками',
  })
  @Post('create')
  createFolder(
    @GetUser() user: UserDto,
    @Body() dto: CreateFolderDto,
  ): Promise<Folder> {
    return this.folderService.createFolder(dto, user.id);
  }

  @ApiOperation({
    summary: 'Получение папки по ее id',
  })
  @ApiResponse({ type: FolderWithCardProgressDto })
  @Get('get-with-progress/:folderId/:profileId')
  getFolderById(
    @Param('folderId') folderId: string,
    @Param('profileId') profileId: string,
  ): Promise<FolderWithCardProgressDto> {
    return this.folderService.getFolderWithProgressCardById(
      folderId,
      profileId,
    );
  }

  @ApiOperation({
    summary: 'Обновление данных папки',
  })
  @ApiResponse({ status: 200, description: 'Папка успешно обновлена' })
  @UseInterceptors(OwnerInterceptor)
  @Put('update/:folderId')
  updateFolder(
    @Param('folderId') id: string,
    @Body() dto: UpdateFolderDto,
  ): Promise<SuccessResponseDto> {
    return this.folderService.updateFolder(id, dto);
  }

  @ApiOperation({
    summary: 'Публикация папки',
  })
  @ApiResponse({
    status: 200,
    description: 'Конфиденциальность папки успешно обновлена',
  })
  @UseInterceptors(OwnerInterceptor)
  @Patch('publish/:folderId')
  publishFolder(
    @Param('folderId') folderId: string,
  ): Promise<SuccessResponseDto> {
    return this.folderService.publishFolder(folderId);
  }
}
