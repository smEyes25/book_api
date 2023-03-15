import { NestFactory } from '@nestjs/core';
import { Constants } from './common/constants/constants';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    exposedHeaders: [
      'Content-Type',
      'X-Custom-Header',
      'Content-Encoding',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    preflightContinue: true,
  };

  app.enableCors(options);

  // app.use((res: Response) => {
  //   res.headers.set('Access-Control-Allow-Origin', '*');
  // });

  await app.listen(Constants.SERVER_PORT);
}
bootstrap();
