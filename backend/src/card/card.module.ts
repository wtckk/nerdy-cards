import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entites/card.entity';

@Module({
  providers: [CardService],
  controllers: [CardController],
  imports: [TypeOrmModule.forFeature([Card])],
  exports: [CardService],
})
export class CardModule {}
