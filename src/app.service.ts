import { Injectable } from '@nestjs/common';
import { AccountService } from './models/account/account.service';
import { Account } from './models/account/entities/account';
import { User } from './models/user/entities/user';

@Injectable()
export class AppService {
  constructor(private accountService: AccountService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createAccount(
    account: Account,
    user: User,
    roleId: string,
  ): Promise<boolean> {
    return await this.accountService.create(user, account, roleId);
  }
}
