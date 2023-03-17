import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Bill {
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
    type: 'varchar',
    length: 50,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  phone_number: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  note: string;

  @Column({
    type: 'int',
    default: 0,
  })
  total_price: string;
}
