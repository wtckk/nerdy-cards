import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Работа с пользователями')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Получения списка всех пользователей' })
  @Get('all')
  getAllUsers(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя по его ID' })
  @Get('get-user-by-id/:id')
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.getUserById(id);
  }

  @Get('get-my-info')
  async getUser(@GetUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
