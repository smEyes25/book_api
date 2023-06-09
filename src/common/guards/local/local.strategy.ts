import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Account } from '../../../models/account/entities/account';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Account> {
    const account = await this.authService.validateLogin(username, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
