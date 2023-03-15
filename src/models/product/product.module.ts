import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { InStockModule } from '../in-stock/in-stock.module';
import { ProductInfoModule } from '../product-info/product-info.module';
import { Product } from './entities/product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductInfoModule,
    InStockModule,
    CategoryModule,
  ],
  exports: [TypeOrmModule, ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
