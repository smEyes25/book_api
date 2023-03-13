import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AccountValidationService } from '../../validations/account/validation.service';
import { Account } from '../../../models/account/entities/account';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private accountValidationService: AccountValidationService) {
    super();
  }

  async validate(username: string, password: string): Promise<Account> {
    const account = await this.accountValidationService.validateLogin(
      username,
      password,
    );
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
