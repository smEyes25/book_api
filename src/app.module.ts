import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigDatabaseModule } from './providers/database/config-database.module';
@Module({
  imports: [ConfigModule.forRoot(), ConfigDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
