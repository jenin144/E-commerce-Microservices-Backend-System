import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private readonly usersClient: ClientProxy) {}

  async getUserByUsername(username: string): Promise<User | null> {
    return lastValueFrom(this.usersClient.send({ cmd: 'getUserByUsername' }, { username }));
  }

  async createUser(user: User): Promise<User> {
    return lastValueFrom(this.usersClient.send({ cmd: 'createUser' }, user));
  }

  async getAllUsers(): Promise<User[]> {
    return lastValueFrom(this.usersClient.send({ cmd: 'getAllUsers' }, {}));
  }

  async updateUser(username: string, updatedData: Partial<User>): Promise<User> {
    return lastValueFrom(
      this.usersClient.send({ cmd: 'updateUser' }, { username, updatedData })
    );
  }

  async deleteUser(username: string): Promise<void> {
    return lastValueFrom(this.usersClient.send({ cmd: 'deleteUser' }, { username }));
  }
}
