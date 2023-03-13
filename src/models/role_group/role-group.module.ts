import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { RoleModule } from '../role/role.module';
import { RoleGroup } from './entities/role-group';
import { RoleGroupService } from './role-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleGroup]),
    RoleModule,
    forwardRef(() => AccountModule),
  ],
  exports: [TypeOrmModule, RoleGroupService],
  controllers: [],
  providers: [RoleGroupService],
})
export class RoleGroupModule {}
