import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { ProductInfo } from './entities/product-info';
import { string2Date } from '../../common/constants/date';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectRepository(ProductInfo)
    private productInfoRepository: Repository<ProductInfo>,
  ) {}

  async findAll(): Promise<ProductInfo[]> {
    return await this.productInfoRepository.find();
  }

  async findById(id: string): Promise<ProductInfo> {
    return await this.productInfoRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<ProductInfo[]> {
    return await this.productInfoRepository.findBy({ name: name });
  }

  async searchByPrice(from: number, to: number): Promise<ProductInfo[]> {
    return await this.productInfoRepository
      .createQueryBuilder('product_info')
      .select()
      .where('price >= :from and price <= :to', { from, to })
      .getMany();
  }

  async create(input: any, productId: string): Promise<string> {
    const id = generateID('PRODUCTINFO_');
    const productInfo = new ProductInfo();
    productInfo.id = id;
    productInfo.name = input.name;
    productInfo.slug = input.slug;
    productInfo.image_url = input.image_url;
    productInfo.description = input.description;
    productInfo.author_name = input.author_name;
    productInfo.published_date = string2Date(input.published_date);
    productInfo.price = input.price;
    productInfo.product_id = productId;

    try {
      const result = await this.productInfoRepository.save(productInfo);
      return result.id;
    } catch (err: any) {
      return null;
    }
  }

  async update(input: any, productInfoId: string): Promise<boolean> {
    const productInfo = await this.findById(productInfoId);
    if (!productInfo) {
      return false;
    }

    productInfo.name = input.name;
    productInfo.slug = input.slug;
    productInfo.description = input.description;
    productInfo.author_name = input.author_name;
    productInfo.published_date = string2Date(input.published_date);
    productInfo.price = input.price;

    try {
      await this.productInfoRepository.save(productInfo);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async delete(id: string): Promise<void> {
    await this.productInfoRepository.delete(id);
  }
}
