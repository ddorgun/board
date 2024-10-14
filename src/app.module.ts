import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserHttpModule } from './users/users-http.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserHttpModule,
    AuthModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
