import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductInfo {
  @PrimaryColumn({
    type: 'varchar',
    length: 120,
    unique: true,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  image_url: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  author_name: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  published_date: Date;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  product_id: string;
}
