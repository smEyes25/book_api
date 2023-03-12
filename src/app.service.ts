import { Injectable } from '@nestjs/common';
import { RoleService } from './models/role/role.service';

@Injectable()
export class AppService {
  constructor(private roleService: RoleService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getTest(): any {
    return this.roleService.findAll();
  }
}
