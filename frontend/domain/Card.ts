import type { Tag } from "./Tag";

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

interface Category {
  name: string;
  modules: Module[];
}

export type { Card, Module, Category };
