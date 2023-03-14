import { NestFactory } from '@nestjs/core';
import { Constants } from './common/constants/constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Origin',
      'Access-Control-Request-Headers',
    ],
  };

  app.enableCors(options);
  await app.listen(Constants.SERVER_PORT);
}
bootstrap();
