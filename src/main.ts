import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { ServiceExceptionToHttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: console,
  });

  const config = new DocumentBuilder()
    .setTitle('Board example')
    .setDescription('The Board API description')
    .setVersion('1.0')
    .addTag('board')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      description: 'JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  // app.use(csurf());
  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ServiceExceptionToHttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
