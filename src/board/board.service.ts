import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { DataSource, Repository } from 'typeorm';
import {
  EntityNotFoundException,
  InternalServerErrorException,
  ServiceException,
  UnauthorizedException,
} from 'src/common/exceptions/service.exception';
import { BoardFile } from './entities/boardFile.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(BoardFile)
    private boardFileRepository: Repository<BoardFile>,
    private userService: UsersService,
    private dataSource: DataSource,
  ) {}

  async create(
    createBoardDto: CreateBoardDto,
    currentUser: User,
    files?: Express.Multer.File[],
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let boardFiles: BoardFile[];
      if (files?.length) {
        boardFiles = await Promise.all<BoardFile>(
          files.map(async (f) =>
            this.boardFileRepository.save({
              url: f.path,
              fileName: f.filename,
            }),
          ),
        );
      }

      const user = await this.userService.findOneByEmail(currentUser.email);

      const board = await this.boardRepository.save({
        ...createBoardDto,
        createdBy: user,
        boardFiles,
      });

      await queryRunner.commitTransaction();
      return board;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ServiceException(error);
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) throw EntityNotFoundException('게시물이 존재하지 않습니다.');
    return board;
  }

  async update(
    id: number,
    updateBoardDto: UpdateBoardDto,
    currentUser: User,
    files?: Express.Multer.File[],
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const board = await this.findOne(id);
    if (!board) {
      throw EntityNotFoundException('게지물이 존재하지 않습니다.');
    }
    const user = await this.userService.findOneByEmail(currentUser.email);
    if (board.createdBy.id !== user?.id) {
      throw UnauthorizedException('게시물 소유자만 수정할 수 있습니다.');
    }
    try {
      let boardFiles: BoardFile[];
      board.boardFiles = [];
      if (files?.length) {
        boardFiles = await Promise.all<BoardFile>(
          files.map(async (f) =>
            this.boardFileRepository.save({
              url: f.path,
              fileName: f.filename,
            }),
          ),
        );
      }

      const result = this.boardRepository.save({
        ...board,
        ...updateBoardDto,
        boardFiles,
      });

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  remove(id: number) {
    return this.boardRepository.softDelete(id);
  }
}
