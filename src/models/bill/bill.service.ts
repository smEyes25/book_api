import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  async findAll(): Promise<Bill[]> {
    return await this.billRepository.find();
  }

  async findById(id: string): Promise<Bill> {
    return await this.billRepository.findOneBy({ id });
  }

  async create(input: any): Promise<boolean> {
    const bill = new Bill();

    bill.created_date = new Date();
    bill.first_name = input.first_name;
    bill.last_name = input.last_name;
    bill.address = input.address;
    bill.email = input.email;
    bill.phone_number = input.phone_number;
    bill.note = input.note;
    bill.total_price = input.total_price;

    try {
      await this.billRepository.save(bill);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async update(input: any, billId: string): Promise<boolean> {
    const bill = await this.findById(billId);

    bill.first_name = input.first_name;
    bill.last_name = input.last_name;
    bill.address = input.address;
    bill.email = input.email;
    bill.phone_number = input.phone_number;
    bill.note = input.note;
    bill.total_price = input.total_price;

    try {
      await this.billRepository.save(bill);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async delete(billId: string): Promise<boolean> {
    try {
      await this.findById(billId);
      return true;
    } catch (err: any) {
      return false;
    }
  }
}
