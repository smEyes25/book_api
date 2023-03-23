import { forwardRef, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { AccountController } from './account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    UserModule,
    forwardRef(() => RoleModule),
  ],
  exports: [TypeOrmModule, AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
