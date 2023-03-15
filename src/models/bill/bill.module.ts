import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillService } from './bill.service';
import { Bill } from './entities/bill';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  exports: [TypeOrmModule, BillService],
  controllers: [],
  providers: [BillService],
})
export class BillModule {}
