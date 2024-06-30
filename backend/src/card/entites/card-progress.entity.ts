import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Card } from './card.entity';

@Entity()
export class CardProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Card, (card) => card.progress, {
    onDelete: 'CASCADE',
  })
  card: Card;

  @ManyToOne(() => Profile, (profile) => profile.cardProgress, {
    onDelete: 'CASCADE',
  })
  profile: Profile;

  @Column({ type: 'boolean', default: false })
  isLearned: boolean;
}
