import { Module } from '@nestjs/common';
import { FolderLikeService } from './folder-like.service';
import { FolderLikeController } from './folder-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderLike } from './entities/folder-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FolderLike])],
  providers: [FolderLikeService],
  controllers: [FolderLikeController],
  exports: [FolderLikeService],
})
export class FolderLikeModule {}
