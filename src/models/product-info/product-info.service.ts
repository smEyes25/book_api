import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { ProductInfo } from './entities/product-info';

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

  async create(input: ProductInfo): Promise<ProductInfo> {
    const id = generateID('PRODUCTINFO_');
    const productInfo = new ProductInfo();
    productInfo.id = id;
    productInfo.name = input.name;
    productInfo.slug = input.slug;
    productInfo.description = input.description;
    productInfo.author_name = input.author_name;
    productInfo.published_date = input.published_date;
    productInfo.price = input.price;
    productInfo.product_id = input.product_id;

    try {
      const result = await this.productInfoRepository.save(productInfo);
      return result;
    } catch (err: any) {
      throw new HttpException(
        'Create product-info failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(input: ProductInfo, productId: string): Promise<void> {
    const productInfo = await this.findById(productId);
    if (!productInfo) {
      throw new HttpException(
        'Product-info is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    productInfo.name = input.name;
    productInfo.slug = input.slug;
    productInfo.description = input.description;
    productInfo.author_name = input.author_name;
    productInfo.published_date = input.published_date;
    productInfo.price = input.price;

    try {
      await this.productInfoRepository.save(productInfo);
    } catch (err: any) {
      throw new HttpException(
        'Update product-info failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    await this.productInfoRepository.delete(id);
  }
}
