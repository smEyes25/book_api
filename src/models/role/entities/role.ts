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
  })
  created_date: Date;

  @Column({
    type: 'date',
  })
  modified_date: Date;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;
}
