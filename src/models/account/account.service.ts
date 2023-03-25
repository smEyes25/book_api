import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from '../../common/constants/hash';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Account } from './entities/account';
import { RoleService } from '../role/role.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private userService: UserService,
    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.findBy({ status: 1 });
  }

  async findById(id: string): Promise<Account> {
    return await this.accountRepository.findOneBy({ id, status: 1 });
  }

  async findByUsername(username: string): Promise<Account> {
    return await this.accountRepository.findOneBy({ username, status: 1 });
  }

  async findRolesById(id: string): Promise<any> {
    return this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.roles', 'role')
      .where('account.id = :id', { id })
      .getOne();
  }

  async findRolesByUsername(username: string): Promise<any> {
    return this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.roles', 'role')
      .where('account.username = :username', { username })
      .getOne();
  }

  async create(input: any): Promise<boolean> {
    const id = generateID('ACCOUNT_');

    const account = new Account();
    account.id = id;
    account.created_date = new Date();
    account.modified_date = new Date();
    account.last_logged_in_date = new Date();
    account.username = input.username;
    account.password = hash(input.password);

    account.roles = [];

    await Promise.all(
      input.role_ids.map(async (role_id: string) => {
        const role = await this.roleService.findById(role_id);
        account.roles.push(role);
      }),
    );

    const user = await this.userService.create(input, id);
    if (!user) {
      return false;
    }
    account.user_id = user.id;

    try {
      await this.accountRepository.save(account);
      return true;
    } catch (err: any) {
      await this.userService.delete(user.id);
      return false;
    }
  }

  async update(input: any, accountId: string): Promise<boolean> {
    const account = await this.findById(accountId);
    if (!account) return false;

    const user = await this.userService.findById(account.user_id);

    account.modified_date = new Date();
    account.username = input.username;
    account.password = hash(input.password);

    account.roles = await Promise.all(
      input.role_ids.map(async (role_id: string) => {
        const role = await this.roleService.findById(role_id);
        return role;
      }),
    );

    try {
      await this.userService.update(input, user.id);
      await this.accountRepository.save(account);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async updateLastLoginDate(accountId: string) {
    const account = await this.findById(accountId);
    if (!account) return false;

    try {
      account.last_logged_in_date = new Date();
      await this.accountRepository.save(account);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async remove(accountId: string): Promise<boolean> {
    const account = await this.findById(accountId);
    if (!account) return false;

    account.status = 0;
    try {
      await this.accountRepository.save(account);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.accountRepository.delete(id);
      return true;
    } catch (err: any) {
      return false;
    }
  }
}
