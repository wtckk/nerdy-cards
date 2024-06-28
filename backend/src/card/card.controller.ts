import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardService } from './card.service';
import { UpdateCardDto } from './dtos/update-card.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateCardDto } from './dtos/create-card.dto';
import { Card } from './entites/card.entity';
import { SuccessResponseDto } from '../utils/response.dto';
import { CardCreateProgressDto } from './dtos/card-create-progress.dto';
import { CardWithProgressDto } from './dtos/card-with-progress.dto';

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
  @Post('create/:folderId')
  createCards(
    @Body() cardsDto: CreateCardDto[],
    @Param('folderId') id: string,
  ): Promise<Card[]> {
    return this.cardService.createCards(cardsDto, id);
  }

  @ApiOperation({
    summary: 'Обновление карточки',
  })
  @ApiBody({ type: [UpdateCardDto] })
  @ApiResponse({ status: 200, description: 'Карточка успешно обновлена' })
  @Put('update')
  updateCards(@Body() cardsDto: UpdateCardDto[]): Promise<SuccessResponseDto> {
    return this.cardService.updatedCard(cardsDto);
  }

  @ApiOperation({
    summary: 'Удаление карточки',
  })
  @ApiResponse({ status: 200, description: 'Карточка успешно удалена' })
  @Delete('delete/:cardId')
  removeCard(@Param('cardId') cardId: string): Promise<SuccessResponseDto> {
    return this.cardService.removeCard(cardId);
  }

  @ApiOperation({
    summary: 'Создание прогресса изучения карточки для пользователя',
  })
  @ApiBody({ type: CardCreateProgressDto })
  @ApiResponse({ type: [CardWithProgressDto] })
  @Post('progress/create/:profileId')
  progressCardSave(
    @Param('profileId') profileId: string,
    @Body() cardsDto: CardCreateProgressDto[],
  ): Promise<CardWithProgressDto[]> {
    return this.cardService.progressCards(cardsDto, profileId);
  }
}
