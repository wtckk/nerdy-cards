import { Body, Controller, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { UpdateCardDto } from './dtos/update-card.dto';

@ApiTags('Работа с карточками')
@ApiBearerAuth()
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({
    summary: 'Обновление карточки',
  })
  @ApiBody({ type: [UpdateCardDto] })
  @Put('update')
  updateCards(@Body() cardsDto: UpdateCardDto[]) {
    return this.cardService.updatedCard(cardsDto);
  }
}
