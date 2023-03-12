import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
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
  full_name: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  phone_number: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 120,
  })
  account_id: string;
}
