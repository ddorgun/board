import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BoardFile } from './boardFile.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'text' })
  contents: string;

  @ManyToOne(() => User, (user) => user.boards, { onDelete: 'SET NULL' })
  createdBy: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => BoardFile, (boardFile) => boardFile.board, {
    nullable: true,
    eager: true,
  })
  boardFiles: BoardFile[];
}
