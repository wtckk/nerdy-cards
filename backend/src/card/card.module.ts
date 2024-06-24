import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entites/card.entity';
import { CardProgress } from './entites/card-progress.entity';

@Module({
  providers: [CardService],
  controllers: [CardController],
  imports: [TypeOrmModule.forFeature([Card, CardProgress])],
  exports: [CardService],
})
export class CardModule {}
