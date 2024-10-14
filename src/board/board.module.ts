import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/utils/multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardFile } from './entities/boardFile.entity';
import { UserHttpModule } from 'src/users/users-http.module';

@Module({
  imports: [
    UserHttpModule,
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    TypeOrmModule.forFeature([Board, BoardFile]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
