import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AccountEntity {
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

  @Column({
    type: 'date',
  })
  last_logged_in_date: Date;

  @Column({
    type: 'varchar',
    length: 24,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  // 1: active - 0: no active
  @Column({
    default: 1,
  })
  status: number;

  @Column({
    type: 'varchar',
    length: 120,
  })
  user_id: string;
}
