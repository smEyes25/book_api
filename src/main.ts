import { NestFactory } from '@nestjs/core';
import { Constants } from './common/constants/constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['Access-Control-Allow-Headers'],
  });
  await app.listen(Constants.SERVER_PORT);
}
bootstrap();
