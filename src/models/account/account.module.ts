import { Module, forwardRef } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account';
import { UserModule } from '../user/user.module';
import { RoleGroupModule } from '../role_group/role-group.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    UserModule,
    forwardRef(() => RoleGroupModule),
    RoleModule,
  ],
  exports: [TypeOrmModule, AccountService],
  controllers: [],
  providers: [AccountService],
})
export class AccountModule {}
