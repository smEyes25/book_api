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
import { CategoryService } from './category.service';
import { Category } from './entities/category';

@Controller('/admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(200)
  @Get()
  async getAll(): Promise<any> {
    return await this.categoryService.findAll();
  }

  @HttpCode(200)
  @Get('/:id')
  async getById(@Param() param): Promise<any> {
    const category = await this.categoryService.findById(param.id);
    if (!category) {
      throw new HttpException('No category found', HttpStatus.BAD_REQUEST);
    }

    return category;
  }

  @HttpCode(200)
  @Get('/product/:id')
  async getProductsById(@Param() param): Promise<any> {
    const products = await this.categoryService.findProductsById(param.id);

    return products;
  }

  @HttpCode(201)
  @Post()
  async create(@Req() req): Promise<boolean> {
    const dataInput = req.body;

    const category = new Category();
    category.name = dataInput.name;
    category.status = dataInput.status;
    category.products = [];

    const isCreated = await this.categoryService.create(category);
    if (!isCreated) {
      throw new HttpException('Create category failed', HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  @HttpCode(200)
  @Put('/:id')
  async update(@Req() req, @Param() param): Promise<any> {
    const categoryId = param.id;

    const isUpdated = await this.categoryService.update(req.body, categoryId);
    if (!isUpdated) {
      throw new HttpException('Create category failed', HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  @HttpCode(200)
  @Delete('/:id')
  async datele(@Param() param): Promise<any> {
    const isDeleted = await this.categoryService.remove(param.id);
    if (!isDeleted) {
      throw new HttpException('Delete category failed', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
