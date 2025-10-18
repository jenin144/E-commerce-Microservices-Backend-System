import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username).then((user) => {
      if (!user) throw new NotFoundException('User not found');
      return user;
    });
  }

  @Get('profile/me')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('password')
  @UseGuards(AuthGuard)
  changePassword(@Request() req, @Body() body: { password: string }) {
    const username = req.user.username;
    return this.usersService.updateByUsername(username, {
      password: body.password,
    });
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  updateProfile(@Request() req, @Body() updatedData: Partial<User>) {
    const username = req.user.username;
    return this.usersService.updateByUsername(username, updatedData);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  deleteProfile(@Request() req) {
    const username = req.user.username;
    return this.usersService.removeByUsername(username);
  }
}
