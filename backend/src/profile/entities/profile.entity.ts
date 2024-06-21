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

/**
 * Модель Profile в базе данных
 */
@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  group?: string;

  @Column({ nullable: true })
  university?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Folder, (folder) => folder.profile)
  folders: Folder[];
}
