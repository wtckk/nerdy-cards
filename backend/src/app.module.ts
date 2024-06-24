import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './auth/entitites/refresh-token.entity';
import { FolderModule } from './folder/folder.module';
import { Folder } from './folder/entites/folder.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { CardModule } from './card/card.module';
import { Card } from './card/entites/card.entity';
import { S3Module } from './s3/s3.module';
import { CardProgress } from './card/entites/card-progress.entity';

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
      entities: [User, RefreshToken, Folder, Profile, Card, CardProgress],
      synchronize: true,
      logging: ['query', 'error'],
    }),
    UserModule,
    AuthModule,
    FolderModule,
    ProfileModule,
    CardModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
