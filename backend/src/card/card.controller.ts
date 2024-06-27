import {
  Body,
  Controller,
  Delete,
  Get,
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
import { CardProgressDto } from './dtos/card-progress.dto';
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
  @ApiBody({ type: CardProgressDto })
  @ApiResponse({ type: [CardWithProgressDto] })
  @Post('progress/create/:profileId')
  progressCardSave(
    @Param('profileId') profileId: string,
    @Body() cardsDto: CardProgressDto[],
  ): Promise<CardWithProgressDto[]> {
    return this.cardService.progressCards(cardsDto, profileId);
  }

  @ApiOperation({
    summary: 'Получения прогресса изучения карточек пользователя',
  })
  @Get('progress/by-profile-id/:profileId/:folderId')
  @ApiResponse({ type: [CardWithProgressDto] })
  getCardsInFolderWithProgressByProfile(
    @Param('profileId') profileId: string,
    @Param('folderId') folderId: string,
  ): Promise<CardWithProgressDto[]> {
    return this.cardService.getCardsInFolderWithProgress(folderId, profileId);
  }
}
