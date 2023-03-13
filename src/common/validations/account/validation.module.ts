import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/common/guards/local/local.strategy';
import { AccountModule } from 'src/models/account/account.module';
import { AccountValidationService } from './validation.service';

@Module({
  imports: [
    AccountModule,
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  exports: [AccountValidationService],
  controllers: [],
  providers: [AccountValidationService, LocalStrategy],
})
export class AccountValidationModule {}
