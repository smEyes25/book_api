import { NestFactory } from '@nestjs/core';
import { Constants } from './common/constants/constants';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  };

  app.enableCors(options);

  await app.listen(Constants.SERVER_PORT);
}
bootstrap();
