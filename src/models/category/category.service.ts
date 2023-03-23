import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { Category } from './entities/category';
import { ProductService } from '../product/product.service';
import { ProductInfoService } from '../product-info/product-info.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
    private productInfoService: ProductInfoService,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findBy({ status: 1 });
    return categories;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id, status: 1 });
    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      name,
      status: 1,
    });
    return category;
  }

  async findProductsById(id: string): Promise<any> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'product')
      .where('category.id = :id', { id })
      .getOne();

    let productInfos = [];
    const products = category.products;
    products.map((product) => {
      const product_info = this.productInfoService.findById(
        product.product_info_id,
      );
      productInfos.push(product_info);
    });

    productInfos = await Promise.all(productInfos);

    return { category, product_infos: productInfos };
  }

  async create(input: Category): Promise<boolean> {
    const id = generateID('CATEGORY_');
    const category = new Category();

    category.id = id;
    category.name = input.name;
    category.status = input.status;
    try {
      await this.categoryRepository.save(category);
      return true;
    } catch (err: any) {
      throw new HttpException('Create category failed', HttpStatus.BAD_REQUEST);
    }
  }

  async update(input: any, categoryId: string): Promise<boolean> {
    const category = await this.findById(categoryId);
    if (!category) return false;

    category.name = input.name;

    try {
      await this.categoryRepository.save(category);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  //change status
  async remove(categoryId: string): Promise<boolean> {
    const category = await this.findById(categoryId);
    if (!category) {
      return false;
    }

    category.status = 0;

    try {
      await this.categoryRepository.save(category);
      return true;
    } catch (err: any) {
      return false;
    }
  }
}
