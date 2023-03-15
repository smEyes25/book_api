import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { Product } from './entities/product';
import { ProductInfoService } from '../product-info/product-info.service';
import { InStockService } from '../in-stock/in-stock.service';
import { ProductInfo } from '../product-info/entities/product-info';
import { InStock } from '../in-stock/entities/in-stock';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productInfoService: ProductInfoService,
    private inStockService: InStockService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findBy({ status: 1 });
  }

  async findById(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id, status: 1 });
  }

  async create(
    inputProductInfo: ProductInfo,
    inputInStock: InStock,
  ): Promise<void> {
    const id = generateID('PRODUCT_');

    inputProductInfo.product_id = id;
    const productInfo = await this.productInfoService.create(inputProductInfo);

    inputInStock.product_id = id;
    const inStock = await this.inStockService.create(inputInStock);

    const product = new Product();
    product.id = id;
    product.created_date = new Date();
    product.modified_date = new Date();
    product.product_info_id = productInfo.id;
    product.in_stock_id = inStock.id;

    try {
      await this.productRepository.save(product);
    } catch (err: any) {
      await this.productInfoService.delete(productInfo.id);
      await this.inStockService.delete(inStock.id);
      throw new HttpException('Create product failed', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    inputProduct: Product,
    inputProductInfo: ProductInfo,
    inputInStock: InStock,
    productId: string,
  ): Promise<boolean> {
    const product = await this.findById(productId);
    if (!product) {
      throw new HttpException('Product is not found', HttpStatus.NOT_FOUND);
    }

    const productInfo = await this.productInfoService.findById(
      product.product_info_id,
    );
    if (!productInfo) {
      throw new HttpException(
        'Product-info is not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const inStock = await this.inStockService.findById(product.in_stock_id);
    if (!inStock) {
      throw new HttpException('In-stock is not found', HttpStatus.NOT_FOUND);
    }

    product.modified_date = new Date();
    product.status = inputProduct.status;

    inStock.quantity = inputInStock.quantity;

    productInfo.name = inputProductInfo.name;
    productInfo.slug = inputProductInfo.slug;
    productInfo.description = inputProductInfo.description;
    productInfo.author_name = inputProductInfo.author_name;
    productInfo.published_date = inputProductInfo.published_date;
    productInfo.price = inputProductInfo.price;

    try {
      await this.productInfoService.update(productInfo, productInfo.id);
      await this.inStockService.update(inStock, inStock.id);
      await this.productRepository.save(product);
      return true;
    } catch (err: any) {
      throw new HttpException('Update product failed', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(productId: string): Promise<void> {
    const product = await this.findById(productId);
    if (!product) {
      throw new HttpException('Product is not found', HttpStatus.NOT_FOUND);
    }

    try {
      product.status = 0;
      await this.productRepository.save(product);
    } catch (err: any) {
      throw new HttpException('Remove product failed', HttpStatus.BAD_REQUEST);
    }
  }
}
