import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { InStock } from './entities/in-stock';

@Injectable()
export class InStockService {
  constructor(
    @InjectRepository(InStock)
    private productInfoRepository: Repository<InStock>,
  ) {}

  async findAll(): Promise<InStock[]> {
    return await this.productInfoRepository.find();
  }

  async findById(id: string): Promise<InStock> {
    return await this.productInfoRepository.findOneBy({ id });
  }

  async create(input: InStock): Promise<InStock> {
    const id = generateID('INSTOCK_');
    const inStock = new InStock();
    inStock.id = id;
    inStock.quantity = input.quantity;
    inStock.product_id = input.product_id;

    try {
      const result = await this.productInfoRepository.save(inStock);
      return result;
    } catch (err: any) {
      throw new HttpException('Create in-stock failed', HttpStatus.BAD_REQUEST);
    }
  }

  async update(input: InStock, inStockId: string): Promise<void> {
    const inStock = await this.findById(inStockId);
    if (!inStock) {
      throw new HttpException('In-stock is not found', HttpStatus.NOT_FOUND);
    }
    inStock.quantity = input.quantity;

    try {
      await this.productInfoRepository.save(inStock);
    } catch (err: any) {
      throw new HttpException('Update in-stock failed', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    await this.productInfoRepository.delete(id);
  }
}
