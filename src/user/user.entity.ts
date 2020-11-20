import { Entity, Column, OneToMany } from 'typeorm';

// DOMAIN
import { DOMAIN } from '../constant';

// ENUM
import { UserRole } from './user.enum';

// BASE ENTITY
import { BaseEntity } from '../base/base.entity';

@Entity({ name: DOMAIN.USER })
export class UserEntity extends BaseEntity {
  @Column({
    nullable: false,
  })
  first_name: string;

  @Column({
    nullable: false,
  })
  last_name: string;

  @Column({
    nullable: false,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  address_street: string;

  @Column({
    nullable: true,
  })
  address_ward: string;

  @Column({
    nullable: true,
  })
  address_district: string;

  @Column({
    nullable: true,
  })
  address_province: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: UserRole.User,
  })
  role: UserRole;
}
