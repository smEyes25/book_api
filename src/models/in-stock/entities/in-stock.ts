import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class InStock {
  @PrimaryColumn({
    type: 'varchar',
    length: 120,
    unique: true,
  })
  id: string;

  @Column({
    type: 'int',
  })
  quantity: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  product_id: string;
}
