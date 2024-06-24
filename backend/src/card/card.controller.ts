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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { UpdateCardDto } from './dtos/update-card.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateCardDto } from './dtos/create-card.dto';
import { Card } from './entites/card.entity';
import { SuccessResponseDto } from '../utils/response.dto';
import { CardProgressDto } from './dtos/card-progress.dto';

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
  @Put('update')
  updateCards(@Body() cardsDto: UpdateCardDto[]): Promise<SuccessResponseDto> {
    return this.cardService.updatedCard(cardsDto);
  }

  @ApiOperation({
    summary: 'Удаление карточки',
  })
  @Delete('delete/:cardId')
  removeCard(@Param('cardId') cardId: string): Promise<SuccessResponseDto> {
    return this.cardService.removeCard(cardId);
  }

  @Post('progress/create/:profileId')
  progressCardSave(
    @Param('profileId') profileId: string,
    @Body() cardsDto: CardProgressDto[],
  ) {
    return this.cardService.progressCards(cardsDto, profileId);
  }

  @Get('progress/by-profile-id/:profileId/:folderId')
  getCardsInFolderWithProgressByProfile(
    @Param('profileId') profileId: string,
    @Param('folderId') folderId: string,
  ) {
    return this.cardService.getCardsInFolderWithProgress(folderId, profileId);
  }
}
