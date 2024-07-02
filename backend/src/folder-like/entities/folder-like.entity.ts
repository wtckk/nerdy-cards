import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Folder } from '../../folder/entites/folder.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Entity()
export class FolderLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Folder, (folder) => folder.likes, { onDelete: 'CASCADE' })
  folder: Folder;

  @ManyToOne(() => Profile, (profile) => profile.folderLikes, {
    onDelete: 'CASCADE',
  })
  profile: Profile;
}
