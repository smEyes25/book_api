import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn({
    type: 'varchar',
    length: 120,
    unique: true,
  })
  id: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  created_date: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  modified_date: Date;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

  @Column({
    type: 'int',
    default: 1,
  })
  status: number;
}
