import { Injectable } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from 'src/common/constants/hash';
import { AccountService } from 'src/models/account/account.service';
import { Account } from 'src/models/account/entities/account';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateLogin(username: string, password: string): Promise<Account> {
    const account = await this.accountService.findByUsername(username);
    if (!account) return null;

    const isPassword = checkPassword(password, account.password);
    if (!isPassword) return null;

    return account;
  }

  async login(account: any) {
    const payload = {
      username: account.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
