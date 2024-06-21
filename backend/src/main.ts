import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  app.setGlobalPrefix('api');

  /**
   * Конфигурация SWAGGER
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Nerdy-cards')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  /**
   * Использование Cookie-Parser
   */
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:5173',
  });
  await app.listen(PORT);
}

bootstrap();
