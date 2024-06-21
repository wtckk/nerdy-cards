import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UserDto } from '../user/dtos/user.dto';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { FolderService } from './folder.service';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { SuccessResponseDto } from '../utils/response.dto';
import { Folder } from './entites/folder.entity';

@ApiTags('Работа с папками')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiOperation({
    summary: 'Получение всех папок пользователей',
  })
  @Get('all')
  getAllFolders(): Promise<Folder[]> {
    return this.folderService.getAllFolder();
  }

  @ApiOperation({
    summary: 'Получение всех папок конкретного пользователя по userId',
  })
  @Get('user/:id')
  getAllFolderUser(@Param('id') userId: string): Promise<Folder[]> {
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
  @Get('get-by-id/:id')
  getFolderById(@Param('id') id: string): Promise<Folder> {
    return this.folderService.getFolderById(id);
  }

  @ApiOperation({
    summary: 'Обновление данных папки',
  })
  @Put('update/:id')
  updateFolder(
    @Param('id') id: string,
    @Body() dto: UpdateFolderDto,
  ): Promise<SuccessResponseDto> {
    return this.folderService.updateFolder(id, dto);
  }

  @ApiOperation({
    summary: 'Публикация папки для изучения',
  })
  @Patch('publish/:id')
  publishFolder(@Param('id') folderId: string): Promise<SuccessResponseDto> {
    return this.folderService.publishFolder(folderId);
  }
}
