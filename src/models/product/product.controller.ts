import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { InStockService } from '../in-stock/in-stock.service';
import { ProductInfoService } from '../product-info/product-info.service';
import { Product } from './entities/product';
import { ProductService } from './product.service';

@Controller('/admin/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productInfoService: ProductInfoService,
    private readonly inStockService: InStockService,
    private readonly categoryService: CategoryService,
  ) {}

  @HttpCode(200)
  @Get()
  async getAll(): Promise<any> {
    const products = await this.productService.findAll();

    const result = products.map((product) => {
      return this.getInfoAndStock(product);
    });

    return await Promise.all(result);
  }

  @HttpCode(200)
  @Get('/:id')
  async getById(@Param() param): Promise<any> {
    const product = await this.productService.findById(param.id);
    if (!product) {
      throw new HttpException('No product found', HttpStatus.BAD_REQUEST);
    }
    const categories = await this.productService.findCategoriesById(product.id);

    const data = await this.getInfoAndStock(product);
    return { data, categories };
  }

  @HttpCode(200)
  @Get('/category/:id')
  async getCategoriesById(@Param() param): Promise<any> {
    const categories = await this.productService.findCategoriesById(param.id);
    if (!categories) {
      throw new HttpException('No product found', HttpStatus.BAD_REQUEST);
    }

    return categories;
  }

  @HttpCode(200)
  @Post('/price')
  async searchByPrice(@Req() req): Promise<any> {
    return await this.productInfoService.searchByPrice(
      req.body.from,
      req.body.to,
    );
  }

  @HttpCode(201)
  @Post()
  async create(@Req() req): Promise<any> {
    const isProduct = await this.productService.create(req.body);
    if (!isProduct) {
      throw new HttpException('Create product failed', HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  @HttpCode(200)
  @Put('/:id')
  async update(@Req() req, @Param() param): Promise<any> {
    const isUpdated = await this.productService.update(req.body, param.id);
    if (!isUpdated) {
      throw new HttpException('Update product failed', HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  @HttpCode(200)
  @Delete('/:id')
  async delete(@Param() param): Promise<any> {
    const isDeleted = await this.productService.remove(param.id);
    if (!isDeleted) {
      throw new HttpException('Delete product failed', HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  async getInfoAndStock(product: Product): Promise<any> {
    const productInfo = await this.productInfoService.findById(
      product.product_info_id,
    );

    const inStock = await this.inStockService.findById(product.in_stock_id);

    console.log(product.id);

    const categories = await this.productService.findCategoriesById(product.id);

    return { id: product.id, productInfo, inStock, categories };
  }
}
