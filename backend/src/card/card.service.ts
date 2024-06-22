import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entites/card.entity';
import { In, Repository } from 'typeorm';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import { createSuccessResponse } from '../utils/utils';
import { SuccessResponseDto } from '../utils/response.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  /**
   * Создание карточек вместе с папкой
   */
  async createCards(
    createCardsDto: CreateCardDto[],
    id: string,
  ): Promise<Card[]> {
    const cardEntities = createCardsDto.map((cardDto) => {
      const card = this.cardRepository.create({
        term: cardDto.term,
        definition: cardDto.definition,
        position: cardDto.position,
        folder: {
          id: id,
        },
      });
      return card;
    });

    return await this.cardRepository.save(cardEntities);
  }

  /**
   * Обновление данных карточки массивом
   */
  async updatedCard(
    updateCardDtos: UpdateCardDto[],
  ): Promise<SuccessResponseDto> {
    // Проверяем, есть ли карточки для обновления
    if (updateCardDtos.length === 0) {
      throw new BadRequestException();
    }

    // Получаем массив ID карточек
    const cardIds = updateCardDtos.map((dto) => dto.id);

    // Находим карточки по ID
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

    return createSuccessResponse('Карточки успешно обновлены');
  }

  /**
   * Удаление карточки
   */
  async removeCard(cardId: string): Promise<SuccessResponseDto> {
    try {
      await this.cardRepository.delete(cardId);
      return createSuccessResponse('Карточка успешно удалена');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * Получение карточки по ID
   */
  async getCardById(cardId: string): Promise<Card> {
    const card = await this.cardRepository.findOneBy({ id: cardId });
    if (!card) {
      throw new BadRequestException({
        message: 'ID не существует',
        status: HttpStatus.OK,
      });
    }
    return card;
  }
}
