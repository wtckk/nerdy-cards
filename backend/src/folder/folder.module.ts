import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entites/folder.entity';

@Module({
  providers: [FolderService],
  controllers: [FolderController],
  imports: [TypeOrmModule.forFeature([Folder])],
})
export class FolderModule {}
