import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigDatabaseModule } from './providers/database/config-database.module';
import { AccountModule } from './models/account/account.module';
import { AuthModule } from './auth/auth.module';
import { AccountValidationModule } from './common/validations/account/validation.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigDatabaseModule,
    AccountModule,
    AuthModule,
    AccountValidationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
