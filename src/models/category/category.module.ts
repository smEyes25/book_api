import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [TypeOrmModule, CategoryService],
  controllers: [],
  providers: [CategoryService],
})
export class CategoryModule {}
