import { Product } from '../../../models/product/entities/product';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn({
    type: 'varchar',
    length: 120,
    unique: true,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];
}
