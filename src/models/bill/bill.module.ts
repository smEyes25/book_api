import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { Bill } from './entities/bill';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  exports: [TypeOrmModule, BillService],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
