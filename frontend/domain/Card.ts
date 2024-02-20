import Tag from "./Tag";

interface Card {
  id: string;
  modulId: string;
  term: string;
  position: number;
  definition: string;
  isLearned: boolean;
}

interface Module {
  id: string;
  ownerId: string;
  name: string;
  likes: number;
  createAt: string;
  cards: Card[];
  tags: Tag[];
}
