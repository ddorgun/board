import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_SCHEMA'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
