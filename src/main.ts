import { NestFactory } from '@nestjs/core';
import { Constants } from './common/constants/constants';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: CorsOptions = {
    // origin: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // optionsSuccessStatus: 204,
    // credentials: true,
    // allowedHeaders: [
    //   'Content-Type',
    //   'Authorization',
    //   'X-Requested-With',
    //   'Accept',
    // ],
    // exposedHeaders: [
    //   'Content-Type',
    //   'X-Custom-Header',
    //   'Content-Encoding',
    //   // 'Authorization',
    //   // 'X-Requested-With',
    //   // 'Accept',
    // ],
    // preflightContinue: true,

    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    exposedHeaders: ['Content-Type', 'Authorization'], // Expose specific headers
    credentials: true, // Allow cookies and authorization headers
    maxAge: 86400, // Cache CORS preflight response for 24 hours
  };

  app.enableCors(options);

  // app.use((res: Response) => {
  //   res.headers.set('Access-Control-Allow-Origin', '*');
  // });

  await app.listen(Constants.SERVER_PORT);
}
bootstrap();
