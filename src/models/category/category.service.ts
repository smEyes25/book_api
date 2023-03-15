import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateID } from '../../common/constants/uuid';
import { Repository } from 'typeorm';
import { Category } from './entities/category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
