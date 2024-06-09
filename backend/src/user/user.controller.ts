import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UserRole } from './enums/user-role.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Работа с пользователями')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Получения списка всех пользователей' })
  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя по его ID' })
  @Roles(UserRole.ADMIN)
  @Get('get-user-by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get('get-my-info')
  async getUser(@GetUser() user: UserDto) {
    return user;
  }
}
