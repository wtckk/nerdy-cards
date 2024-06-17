import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { IsEmail } from 'class-validator';
import { RefreshToken } from '../../auth/entitites/refresh-token.entity';
import { Profile } from '../../profile/entities/profile.entity';

/**
 * Модель User в базе данных
 */
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
