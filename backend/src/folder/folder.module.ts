import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entites/folder.entity';
import { ProfileModule } from '../profile/profile.module';
import { CardModule } from '../card/card.module';

@Module({
  providers: [FolderService],
  controllers: [FolderController],
  imports: [TypeOrmModule.forFeature([Folder]), ProfileModule, CardModule],
})
export class FolderModule {}
