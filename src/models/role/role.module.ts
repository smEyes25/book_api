import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => AccountModule)],
  exports: [TypeOrmModule, RoleService],
  controllers: [],
  providers: [RoleService],
})
export class RoleModule {}
