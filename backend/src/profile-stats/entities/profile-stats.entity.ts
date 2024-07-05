import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';

/**
 * Модель ProfileStats в БД
 */
@Entity()
export class ProfileStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  foldersCreated: number;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  cardsCreated: number;

  @Column({ default: 0 })
  cardsLearned: number;

  @Column({ default: 0 })
  cardsNotLearned: number;

  @OneToOne(() => Profile, (profile) => profile.stats)
  profile: Profile;
}
