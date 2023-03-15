import { Category } from '../../../models/category/entities/category';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn({
    type: 'varchar',
    length: 120,
    unique: true,
  })
  id: string;

  @Column({
    type: 'date',
  })
  created_date: Date;

  @Column({
    type: 'date',
  })
  modified_date: Date;

  // 1: active - 0: no active
  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

  @Column({
    type: 'varchar',
    length: 120,
  })
  product_info_id: string;

  @Column({
    type: 'varchar',
    length: 120,
  })
  in_stock_id: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
