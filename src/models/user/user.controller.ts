import { Controller, Get, Param } from '@nestjs/common';
import { User } from './entities/user';
import { UserService } from './user.service';

@Controller('/admin/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getById(@Param() param): Promise<User> {
    return await this.userService.findById(param.id);
  }

  @Get('/:name')
  async getByName(@Param() param): Promise<User[]> {
    return await this.userService.findByName(param.name);
  }
}
