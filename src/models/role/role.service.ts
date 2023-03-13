import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { Role } from './entities/role';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    const roles = await this.roleRepository.findBy({ status: 1 });
    return roles;
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id, status: 1 });
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ name, status: 1 });
    return role;
  }

  async create(input: Role): Promise<boolean> {
    const id = generateID('ROLE_');
    const role = new Role();
    role.id = id;
    role.name = input.name;
    role.created_date = new Date();
    role.modified_date = new Date();
    role.status = input.status;
    try {
      await this.roleRepository.save(role);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async update(input: Role): Promise<boolean> {
    const role = await this.findById(input.id);
    role.name = input.name;
    role.status = input.status;
    role.modified_date = new Date();
    try {
      await this.roleRepository.save(role);
    } catch (err: any) {
      return false;
    }
  }

  //change status
  async remove(id: string): Promise<boolean> {
    const role = await this.findById(id);
    role.status = 0;
    try {
      await this.roleRepository.save(role);
    } catch (err: any) {
      return false;
    }
  }

  //delete
  async delete(id: string): Promise<boolean> {
    try {
      await this.roleRepository.delete(id);
    } catch (err: any) {
      return false;
    }
  }
}
