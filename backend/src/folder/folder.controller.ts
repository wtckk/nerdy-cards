import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UserDto } from '../user/dtos/user.dto';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { FolderService } from './folder.service';
import { UpdateFolderDto } from './dtos/update-folder.dto';

@ApiTags('Работа с папками')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post('create')
  createFolder(@GetUser() user: UserDto, @Body() dto: CreateFolderDto) {
    return this.folderService.createFolder(dto, user);
  }

  @Get('all')
  getAllFolders() {
    return this.folderService.getAllFolder();
  }

  @Put('update/:id')
  updateFolder(@Param('id') id: string, @Body() dto: UpdateFolderDto) {
    return this.folderService.updateFolder(id, dto);
  }
}