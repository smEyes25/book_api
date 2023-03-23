import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { Role } from './entities/role';
import { AccountService } from '../account/account.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
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

  async findAccountsById(id: string): Promise<any> {
    return await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.accounts', 'account')
      .where('role.id = :id', { id })
      .getOne();
  }

  async create(input: any): Promise<boolean> {
    const id = generateID('ROLE_');
    const role = new Role();
    role.id = id;
    role.name = input.name;
    role.created_date = new Date();
    role.modified_date = new Date();
    role.status = input.status;
    role.accounts = [];

    try {
      await this.roleRepository.save(role);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async update(input: any): Promise<boolean> {
    const role = await this.findById(input.id);
    role.name = input.name;
    role.status = input.status;
    role.modified_date = new Date();

    role.accounts = await Promise.all(
      input.account_ids.map(async (account_ids: string) => {
        const user = await this.accountService.findById(account_ids);
        return user;
      }),
    );

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
