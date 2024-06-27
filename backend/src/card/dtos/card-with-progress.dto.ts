/**
 * DTO для вывода карточки с ее прогрессом
 */
export class CardWithProgressDto {
  id: string;

  term: string;

  definition: string;

  position: number;

  isLearned: boolean;
}
