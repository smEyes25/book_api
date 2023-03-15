import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [TypeOrmModule, CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
