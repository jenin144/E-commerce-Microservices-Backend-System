import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ username }) ?? undefined;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async updateByUsername(username: string, updatedData: Partial<User>): Promise<User> {
    const user = await this.findOne(username);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updatedData);
    return this.usersRepository.save(user);
  }

  async removeByUsername(username: string): Promise<void> {
    const user = await this.findOne(username);
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
  }
}
