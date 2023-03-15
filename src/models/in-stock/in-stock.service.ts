import { Injectable } from '@nestjs/common';
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

  async create(input: any, productId: string): Promise<string> {
    const id = generateID('INSTOCK_');
    const inStock = new InStock();
    inStock.id = id;
    inStock.quantity = input.quantity;
    inStock.product_id = productId;

    try {
      const result = await this.productInfoRepository.save(inStock);
      return result.id;
    } catch (err: any) {
      return null;
    }
  }

  async update(input: any, inStockId: string): Promise<boolean> {
    const inStock = await this.findById(inStockId);
    if (!inStock) {
      return false;
    }
    inStock.quantity = input.quantity;

    try {
      await this.productInfoRepository.save(inStock);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async delete(id: string): Promise<void> {
    await this.productInfoRepository.delete(id);
  }
}
