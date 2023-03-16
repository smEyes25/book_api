import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../models/category/entities/category';
import { InStock } from '../../models/in-stock/entities/in-stock';
import { ProductInfo } from '../../models/product-info/entities/product-info';
import { Product } from '../../models/product/entities/product';
import { Account } from '../../models/account/entities/account';
import { Role } from '../../models/role/entities/role';
import { RoleGroup } from '../../models/role_group/entities/role-group';
import { User } from '../../models/user/entities/user';
import { Bill } from '../../models/bill/entities/bill';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Account,
          Role,
          User,
          RoleGroup,
          Product,
          ProductInfo,
          InStock,
          Category,
          Bill,
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ConfigDatabaseModule {}
