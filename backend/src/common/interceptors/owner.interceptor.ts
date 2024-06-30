import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { FolderService } from '../../folder/folder.service';
import { ProfileService } from '../../profile/profile.service';
import { UserRole } from '../../user/enums/user-role.enum';

/**
 * Интерцептор для проверки возможности изменения пользователем Folder и Profile
 */
@Injectable()
export class OwnerInterceptor implements NestInterceptor {
  constructor(
    private readonly folderService: FolderService,
    private readonly profileService: ProfileService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const profileId = request.params.profileId;
    const folderId = request.params.folderId;

    // Если у пользователя права администратор, то проверки не требуется
    if (user.role === UserRole.ADMIN) {
      return next.handle();
    }

    // Проверка прав доступа для folder
    if (folderId) {
      return from(this.folderService.getFolderById(folderId)).pipe(
        switchMap((folder) => {
          if (folder.profile.user.id !== user.id) {
            throw new ForbiddenException({
              message: 'Ошибка доступа',
              status: HttpStatus.FORBIDDEN,
            });
          }
          return next.handle();
        }),
      );
    }

    // Проверка прав доступа для profile
    if (profileId) {
      return from(this.profileService.getProfileById(profileId)).pipe(
        switchMap((profile) => {
          if (profile.user.id !== user.id) {
            throw new ForbiddenException({
              message: 'Ошибка доступа',
              status: HttpStatus.FORBIDDEN,
            });
          }
          return next.handle();
        }),
      );
    }
  }
}
