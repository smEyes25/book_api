import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [TypeOrmModule, RoleService],
  controllers: [],
  providers: [RoleService],
})
export class RoleModule {}
