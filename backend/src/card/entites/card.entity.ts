import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Folder } from '../../folder/entites/folder.entity';

/**
 * Модель Card в базе данных
 */
@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  term: string;

  @Column()
  definition: string;

  @Column({ type: 'bigint' })
  position: number;

  @ManyToOne(() => Folder, (folder) => folder.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'folderId' })
  folder: Folder;
}
