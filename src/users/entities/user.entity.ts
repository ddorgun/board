import { Board } from 'src/board/entities/board.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Unique,
} from 'typeorm';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ default: Role.User })
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Board, (board) => board.createdBy, {
    eager: false,
    nullable: true,
  })
  boards: Board;
}
