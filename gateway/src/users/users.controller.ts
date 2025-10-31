import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '../strategies/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @UseGuards(AuthGuard)
  @Put(':username')
  updateUser(@Param('username') username: string, @Body() updatedData: Partial<User>) {
    return this.usersService.updateUser(username, updatedData);
  }

  @UseGuards(AuthGuard)
  @Delete(':username')
  deleteUser(@Param('username') username: string) {
    return this.usersService.deleteUser(username);
  }
}
