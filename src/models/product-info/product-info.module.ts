import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfo } from './entities/product-info';
import { ProductInfoService } from './product-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInfo])],
  exports: [TypeOrmModule, ProductInfoService],
  controllers: [],
  providers: [ProductInfoService],
})
export class ProductInfoModule {}
