import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InStockModule } from '../in-stock/in-stock.module';
import { ProductInfoModule } from '../product-info/product-info.module';
import { Product } from './entities/product';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductInfoModule,
    InStockModule,
  ],
  exports: [TypeOrmModule, ProductService],
  controllers: [],
  providers: [ProductService],
})
export class ProductModule {}
