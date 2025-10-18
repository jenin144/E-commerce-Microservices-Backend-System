import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { userId: 1, username: 'jenin', password: '123' },
    { userId: 2, username: 'maria', password: 'guess' },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
  
  async updateByUsername(username: string, updatedData: Partial<User>): Promise<User> {
    const user = this.users.find(u => u.username === username);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, updatedData);
    return user;
  }

  async removeByUsername(username: string): Promise<void> {
    const index = this.users.findIndex(u => u.username === username);
    if (index === -1) throw new NotFoundException('User not found');

    this.users.splice(index, 1);
  }
}
