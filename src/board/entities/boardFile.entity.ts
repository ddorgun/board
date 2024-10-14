import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';

@Entity('board_files')
export class BoardFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fileName: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Board, (board) => board.boardFiles, { onDelete: 'CASCADE' })
  board: Board;
}
