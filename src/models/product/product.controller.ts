import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { InStock } from '../in-stock/entities/in-stock';
import { InStockService } from '../in-stock/in-stock.service';
import { ProductInfo } from '../product-info/entities/product-info';
import { ProductInfoService } from '../product-info/product-info.service';
import { Product } from './entities/product';
import { ProductService } from './product.service';

@Controller('/admin/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productInfoService: ProductInfoService,
    private readonly inStockService: InStockService,
  ) {}

  @Get('/all')
  async getAll(@Res() res): Promise<any> {
    const result = [];
    const products = await this.productService.findAll();

    products.map(async (product) => {
      let data = {};
      let productInfo = await this.productInfoService.findById(
        product.product_info_id,
      );
      productInfo = {
        ...productInfo,
        id: productInfo.id,
        product_id: productInfo.product_id,
      };

      let inStock = await this.inStockService.findById(product.in_stock_id);
      inStock = { ...inStock, id: inStock.id, product_id: inStock.product_id };

      product = {
        ...product,
        product_info_id: product.product_info_id,
        in_stock_id: product.in_stock_id,
        status: product.status,
      };

      data = { ...product, productInfo, inStock };

      result.push(data);
    });

    return result;
  }

  @Post('/create')
  async create(@Req() req): Promise<any> {
    const input = req.body;

    const productInfo = new ProductInfo();
    productInfo.name = input.name;
    productInfo.slug = input.slug;
    productInfo.description = input.description;
    productInfo.author_name = input.author_name;
    productInfo.published_date = input.published_date;
    productInfo.price = input.price;

    const inStock = new InStock();
    inStock.quantity = input.quantity;

    const product = new Product();
    product.status = input.status;
  }
}
