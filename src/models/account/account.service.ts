import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from '../../common/constants/hash';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { RoleGroupService } from '../role_group/role-group.service';
import { User } from '../user/entities/user';
import { UserService } from '../user/user.service';
import { Account } from './entities/account';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private userService: UserService,
    @Inject(forwardRef(() => RoleGroupService))
    private roleGroupService: RoleGroupService,
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

  async create(
    inputUser: User,
    inputAccount: Account,
    roleId: string,
  ): Promise<boolean> {
    const id = generateID('ACCOUNT_');

    inputUser.account_id = id;
    const user = await this.userService.create(inputUser);
    if (!user) {
      return false;
    }

    const account = new Account();
    account.id = id;
    account.created_date = new Date();
    account.modified_date = new Date();
    account.last_logged_in_date = inputAccount.last_logged_in_date;
    account.username = inputAccount.username;
    account.password = hash(inputAccount.password);
    account.status = inputAccount.status;
    account.user_id = user.id;

    const roleGroup = await this.roleGroupService.create(roleId, account.id);
    if (!roleGroup) return false;

    try {
      await this.accountRepository.save(account);
      return true;
    } catch (err: any) {
      await this.userService.delete(user.id);
      await this.roleGroupService.delete(roleGroup.id);
      return false;
    }
  }

  async update(inputUser: User, inputAccount: Account): Promise<boolean> {
    const account = await this.findById(inputAccount.id);
    if (!account) return false;

    const user = await this.userService.findById(account.user_id);
    if (!user) return false;

    account.modified_date = new Date();
    account.username = inputAccount.username;
    account.password = hash(inputAccount.password);
    account.status = inputAccount.status;

    user.full_name = inputUser.full_name;
    user.phone_number = inputUser.phone_number;
    user.address = inputUser.address;
    user.email = inputUser.email;

    try {
      await this.userService.create(user);
      await this.accountRepository.save(account);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async updateLastLoginDate(accountId: string, lastLoggedDate: Date) {
    const account = await this.findById(accountId);
    if (!account) return false;

    try {
      account.last_logged_in_date = lastLoggedDate;
      await this.accountRepository.save(account);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async updateRole(accountId: string, roleIds: string[]): Promise<boolean> {
    const account = this.findById(accountId);
    if (!account) return false;

    if (roleIds.length > 0) {
      roleIds.map(async (roleId) => {
        const role = await this.roleService.findById(roleId);
        if (!role) return false;

        const roleGroup = await this.roleGroupService.create(roleId, accountId);
        if (!roleGroup) return false;
      });

      return true;
    }

    return false;
  }

  async remove(accountId: string): Promise<boolean> {
    const account = await this.findById(accountId);
    if (!account) return false;

    try {
      account.status = 0;
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
