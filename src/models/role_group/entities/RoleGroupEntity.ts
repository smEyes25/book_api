import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RoleGroup {
  @PrimaryColumn({
    type: 'varchar',
    length: 120,
    unique: true,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 120,
  })
  account_id: string;

  @Column({
    type: 'varchar',
    length: 120,
  })
  role_id: string;
}
