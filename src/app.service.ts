import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AccountService } from './models/account/account.service';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  async register(input: any): Promise<any> {
    const isRegistered = this.accountService.create(input);
    if (!isRegistered) return false;

    return true;
  }

  async login(input: any): Promise<any> {
    const data = this.authService.login(input);
    return data;
  }
}
