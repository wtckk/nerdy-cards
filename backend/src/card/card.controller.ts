import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { UpdateCardDto } from './dtos/update-card.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateCardDto } from './dtos/create-card.dto';
import { Card } from './entites/card.entity';
import { SuccessResponseDto } from '../utils/response.dto';

@ApiTags('Работа с карточками')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({
    summary: 'Создание карточек в созданной папке',
  })
  @ApiBody({ type: [CreateCardDto] })
  @Post('create/:id')
  createCards(
    @Body() cardsDto: CreateCardDto[],
    @Param('id') id: string,
  ): Promise<Card[]> {
    return this.cardService.createCards(cardsDto, id);
  }

  @ApiOperation({
    summary: 'Обновление карточки',
  })
  @ApiBody({ type: [UpdateCardDto] })
  @Put('update')
  updateCards(@Body() cardsDto: UpdateCardDto[]): Promise<SuccessResponseDto> {
    return this.cardService.updatedCard(cardsDto);
  }

  @ApiOperation({
    summary: 'Удаление карточки',
  })
  @Delete('delete/:id')
  removeCard(@Param('id') cardId: string): Promise<SuccessResponseDto> {
    return this.cardService.removeCard(cardId);
  }
}
