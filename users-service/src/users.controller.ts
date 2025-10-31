import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'getUserByUsername' })
  async getUserByUsername(@Payload() data: { username: string }) {
    const user = await this.usersService.findOne(data.username);
    return user || null;
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() user: User) {
    return this.usersService.create(user);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(@Payload() data: { username: string; updatedData: Partial<User> }) {
    return this.usersService.updateByUsername(data.username, data.updatedData);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async deleteUser(@Payload() data: { username: string }) {
    return this.usersService.removeByUsername(data.username);
  }
}
