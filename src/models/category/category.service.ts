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
    const roles = await this.categoryRepository.findBy({ status: 1 });
    return roles;
  }

  async findById(id: string): Promise<Category> {
    const role = await this.categoryRepository.findOneBy({ id, status: 1 });
    return role;
  }

  async findByName(name: string): Promise<Category> {
    const role = await this.categoryRepository.findOneBy({
      name,
      status: 1,
    });
    return role;
  }

  async create(input: Category): Promise<Category> {
    const id = generateID('ROLE_');
    const category = new Category();

    category.id = id;
    category.name = input.name;
    category.status = input.status;
    try {
      const result = await this.categoryRepository.save(category);
      return result;
    } catch (err: any) {
      throw new HttpException('Create category failed', HttpStatus.BAD_REQUEST);
    }
  }

  async update(input: Category, categoryId: string): Promise<boolean> {
    const category = await this.findById(categoryId);
    if (!category) {
      throw new HttpException('Category is not found', HttpStatus.NOT_FOUND);
    }
    category.name = input.name;
    category.status = input.status;

    try {
      await this.categoryRepository.save(category);
      return true;
    } catch (err: any) {
      throw new HttpException('Update category failed', HttpStatus.BAD_REQUEST);
    }
  }

  //change status
  async remove(categoryId: string): Promise<boolean> {
    const category = await this.findById(categoryId);
    if (!category) {
      throw new HttpException('Category is not found', HttpStatus.NOT_FOUND);
    }

    category.status = 0;

    try {
      await this.categoryRepository.save(category);
      return true;
    } catch (err: any) {
      throw new HttpException('Remove category failed', HttpStatus.BAD_REQUEST);
    }
  }
}
