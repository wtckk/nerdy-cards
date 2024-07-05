import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
// Модули
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FolderModule } from './folder/folder.module';
import { ProfileModule } from './profile/profile.module';
import { CardModule } from './card/card.module';
import { User } from './user/entities/user.entity';
import { S3Module } from './s3/s3.module';
import { FolderLikeModule } from './folder-like/folder-like.module';
// Модели
import { RefreshToken } from './auth/entitites/refresh-token.entity';
import { CardProgress } from './card/entites/card-progress.entity';
import { Folder } from './folder/entites/folder.entity';
import { FolderLike } from './folder-like/entities/folder-like.entity';
import { Profile } from './profile/entities/profile.entity';
import { Card } from './card/entites/card.entity';

import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './common/guards/custom-throttler.guard';
import { ProfileStatsModule } from './profile-stats/profile-stats.module';
import { ProfileStats } from './profile-stats/entities/profile-stats.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        User,
        RefreshToken,
        Folder,
        Profile,
        Card,
        CardProgress,
        FolderLike,
        ProfileStats,
      ],
      synchronize: true,
      logging: ['query', 'error'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    UserModule,
    AuthModule,
    FolderModule,
    ProfileModule,
    CardModule,
    S3Module,
    FolderLikeModule,
    ProfileStatsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
