import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entites/card.entity';
import { In, Repository } from 'typeorm';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import { createSuccessResponse } from '../utils/utils';
import { SuccessResponseDto } from '../utils/response.dto';
import { CardProgress } from './entites/card-progress.entity';
import { CardCreateProgressDto } from './dtos/card-create-progress.dto';
import { CardWithProgressDto } from './dtos/card-with-progress.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(CardProgress)
    private readonly cardProgressRepository: Repository<CardProgress>,
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
   * Создание прогресса прохождение модуля по карточкам
   */
  async progressCards(
    cardsProgressDtos: CardCreateProgressDto[],
    profileId: string,
  ): Promise<CardWithProgressDto[]> {
    // Получаем карточки с существующим прогрессом пользователя
    const existingProgress = await this.cardProgressRepository.find({
      where: {
        card: { id: In(cardsProgressDtos.map((dto) => dto.id)) },
        profile: { id: profileId },
      },
      relations: ['card', 'profile'],
    });

    const cardsWithProgress = await Promise.all(
      cardsProgressDtos.map(async (dto) => {
        const existingCardProgress = existingProgress.find(
          (progress) =>
            progress.card.id === dto.id && progress.profile.id === profileId,
        );
        // Если есть карточки с прогрессом, то мы их обновляем
        if (existingCardProgress) {
          return this.cardProgressRepository.save({
            ...existingCardProgress,
            isLearned: dto.isLearned,
          });
        } else {
          // Если прогресс не существовал, то создаем
          const savedProgress = this.cardProgressRepository.create({
            card: { id: dto.id },
            profile: { id: profileId },
            isLearned: dto.isLearned,
          });
          return await this.cardProgressRepository.save(savedProgress);
        }
      }),
    );

    return cardsWithProgress.map((progress) =>
      plainToClass(CardWithProgressDto, {
        id: progress.card.id,
        term: progress.card.term,
        definition: progress.card.term,
        position: progress.card.position,
        isLearned: progress.isLearned,
      }),
    );
  }
}
