import { Injectable } from '@nestjs/common/decorators';
import { AccountService } from '../../../models/account/account.service';
import { checkPassword } from '../../../common/constants/hash';
import { Account } from '../../../models/account/entities/account';

@Injectable()
export class AccountValidationService {
  constructor(private accountService: AccountService) {}

  async validateLogin(username: string, password: string): Promise<Account> {
    const account = await this.accountService.findByUsername(username);
    if (!account) return null;

    const isPassword = checkPassword(password, account.password);
    if (!isPassword) return null;

    return account;
  }
}
