import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { User } from './entities/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<User[]> {
    return await this.userRepository.findBy({ full_name: name });
  }

  async create(input: any, accountId: string): Promise<User> {
    const id = generateID('USER_');

    const user = new User();
    user.id = id;
    user.full_name = input.full_name;
    user.address = input.address;
    user.email = input.email;
    user.phone_number = input.phone_number;
    user.account_id = accountId;

    try {
      const result = await this.userRepository.save(user);
      return result;
    } catch (err: any) {
      return null;
    }
  }

  async update(input: any, userId: string): Promise<boolean> {
    const user = await this.findById(userId);
    user.full_name = input.full_name;
    user.address = input.address;
    user.email = input.email;
    user.phone_number = input.phone_number;
    try {
      await this.userRepository.save(user);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
