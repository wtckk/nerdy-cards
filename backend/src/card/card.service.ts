import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entites/card.entity';
import { In, Repository } from 'typeorm';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  /**
   * Создание CARD
   */
  async createCard(createCardsDto: CreateCardDto[]) {
    const cardEntities = createCardsDto.map((cardDto) => {
      const card = this.cardRepository.create({
        term: cardDto.term,
        definition: cardDto.definition,
        position: cardDto.position,
        folder: {
          id: cardDto.folderId,
        },
      });
      return card;
    });

    return await this.cardRepository.save(cardEntities);
  }

  async updatedCard(updateCardDtos: UpdateCardDto[]) {
    // Проверяем, есть ли карточки для обновления
    if (updateCardDtos.length === 0) {
      return {
        status: HttpStatus.OK,
        message: 'Карточки не были обновлены',
      };
    }

    // Получаем массив ID карточек
    const cardIds = updateCardDtos.map((dto) => dto.id);

    // Находим карточки в базе данных по ID
    const existingCards = await this.cardRepository.find({
      where: { id: In(cardIds) },
    });

    // Обновляем карточки
    const updatedCards = existingCards.map((existingCard) => {
      const updateDto = updateCardDtos.find(
        (dto) => dto.id === existingCard.id,
      );
      return { ...existingCard, ...updateDto };
    });

    await this.cardRepository.save(updatedCards);

    return {
      status: HttpStatus.OK,
      message: 'Карточки успешно обновлены',
    };
  }
}
