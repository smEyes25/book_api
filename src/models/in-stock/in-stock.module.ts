import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InStock } from './entities/in-stock';
import { InStockService } from './in-stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([InStock])],
  exports: [TypeOrmModule, InStockService],
  controllers: [],
  providers: [InStockService],
})
export class InStockModule {}
