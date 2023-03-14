import { NestFactory } from '@nestjs/core';
import { Constants } from './common/constants/constants';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // preflightContinue: true,
    optionsSuccessStatus: 200,
    credentials: true,
    // allowedHeaders: [
    //   'Content-Type',
    //   'Authorization',
    //   'Access-Control-Allow-Methods',
    //   'Access-Control-Allow-Origin',
    //   'Access-Control-Request-Headers',
    // ],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(options);
  await app.listen(Constants.SERVER_PORT);
}
bootstrap();
