import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account';
import { Role } from '../role/entities/role';
import { RoleService } from '../role/role.service';
import { RoleGroup } from './entities/role-group';

@Injectable()
export class RoleGroupService {
  constructor(
    @InjectRepository(RoleGroup)
    private roleGroupRepository: Repository<RoleGroup>,
    private roleService: RoleService,
    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
  ) {}

  async findAll(): Promise<RoleGroup[]> {
    const roleGroups = await this.roleGroupRepository.find();
    return roleGroups;
  }

  async findById(id: string): Promise<RoleGroup> {
    const roleGroup = await this.roleGroupRepository.findOneBy({ id });
    return roleGroup;
  }

  async findByRoleIdAndAccountId(roleId: string, accountId: string) {
    const roleGroup = await this.roleGroupRepository.findOneBy({
      role_id: roleId,
      account_id: accountId,
    });
    return roleGroup;
  }

  async findRolesByAccountId(id: string): Promise<Role[]> {
    const roleGroups = await this.roleGroupRepository.findBy({
      account_id: id,
    });
    const roles: Role[] = [];
    roleGroups.map(async (roleGroup: RoleGroup) => {
      const role = await this.roleService.findById(roleGroup.role_id);
      roles.push(role);
    });

    return roles;
  }

  async findAccountsByRoleId(id: string): Promise<Account[]> {
    const roleGroups = await this.roleGroupRepository.findBy({ role_id: id });
    const accounts: Account[] = [];

    roleGroups.map(async (roleGroup: RoleGroup) => {
      const account = await this.accountService.findById(roleGroup.account_id);
      accounts.push(account);
    });

    return accounts;
  }

  async create(roleId: string, accountId: string): Promise<RoleGroup> {
    const id = generateID('ROLEGROUP_');
    const roleGroup = new RoleGroup();
    roleGroup.id = id;
    roleGroup.role_id = roleId;
    roleGroup.account_id = accountId;
    try {
      const result = await this.roleGroupRepository.save(roleGroup);
      return result;
    } catch (err: any) {
      return null;
    }
  }

  async update(
    roleId: string,
    accountId: string,
    newRoleId: string,
    newAccountId: string,
  ): Promise<boolean> {
    const roleGroup = await this.findByRoleIdAndAccountId(roleId, accountId);
    roleGroup.role_id = newRoleId;
    roleGroup.account_id = newAccountId;
    try {
      await this.roleGroupRepository.save(roleGroup);
    } catch (err: any) {
      return false;
    }
  }

  //delete
  async deleteByRoleIdAndAccountId(
    roleId: string,
    accountId: string,
  ): Promise<boolean> {
    try {
      await this.roleGroupRepository.delete({
        role_id: roleId,
        account_id: accountId,
      });
    } catch (err: any) {
      return false;
    }
  }

  async delete(id: string): Promise<void> {
    await this.roleGroupRepository.delete(id);
  }
}
