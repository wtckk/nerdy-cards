import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Folder } from '../../folder/entites/folder.entity';
import { CardProgress } from '../../card/entites/card-progress.entity';
import { FolderLike } from '../../folder-like/entities/folder-like.entity';
import { ProfileStats } from '../../profile-stats/entities/profile-stats.entity';

/**
 * Модель Profile в базе данных
 */
@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  group?: string;

  @Column({ nullable: true })
  university?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToOne(() => ProfileStats, (profileStats) => profileStats.profile, {
    cascade: true,
  })
  @JoinColumn()
  stats: ProfileStats;

  @OneToMany(() => Folder, (folder) => folder.profile)
  folders: Folder[];

  @OneToMany(() => CardProgress, (cardProgress) => cardProgress.profile)
  cardProgress: CardProgress[];

  @OneToMany(() => FolderLike, (folderLike) => folderLike.profile)
  folderLikes: FolderLike[];
}
