import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { Product } from './entities/product';
import { ProductInfoService } from '../product-info/product-info.service';
import { InStockService } from '../in-stock/in-stock.service';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productInfoService: ProductInfoService,
    private inStockService: InStockService,
    private categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findBy({ status: 1 });
  }

  async findById(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id, status: 1 });
  }

  async findCategoriesById(id: string): Promise<any> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('product.id = :id', { id })
      .getMany();
  }

  async create(input: any): Promise<boolean> {
    const id = generateID('PRODUCT_');

    const productInfoId = await this.productInfoService.create(input, id);

    if (!productInfoId) {
      return false;
    }

    const inStockId = await this.inStockService.create(input, id);

    if (!inStockId) return false;

    const product = new Product();
    product.id = id;
    product.created_date = new Date();
    product.modified_date = new Date();
    product.product_info_id = productInfoId;
    product.in_stock_id = inStockId;
    product.categories = [];

    input.category_ids.map(async (categoryId: string) => {
      const category = await this.categoryService.findById(categoryId);
      product.categories.push(category);
    });

    try {
      await this.productRepository.save(product);
      return true;
    } catch (err: any) {
      await this.productInfoService.delete(productInfoId);
      await this.inStockService.delete(inStockId);
      return false;
    }
  }

  async update(input: any, productId: string): Promise<boolean> {
    const product = await this.findById(productId);
    if (!product) {
      return false;
    }

    const isUpdatedProductInfo = await this.productInfoService.update(
      input,
      product.product_info_id,
    );

    if (!isUpdatedProductInfo) return false;

    const isUpdatedInStock = await this.inStockService.update(
      input,
      product.in_stock_id,
    );

    if (!isUpdatedInStock) {
      return false;
    }

    product.categories = await Promise.all(
      input.category_ids.map(async (categoryId: string) => {
        const category = await this.categoryService.findById(categoryId);
        // product.categories.push(category);
        return category;
      }),
    );
    product.modified_date = new Date();

    try {
      await this.productRepository.save(product);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async remove(productId: string): Promise<boolean> {
    const product = await this.findById(productId);
    if (!product) {
      return false;
    }

    product.status = 0;

    try {
      await this.productRepository.save(product);
      return true;
    } catch (err: any) {
      return false;
    }
  }
}
