import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigDatabaseModule } from './providers/database/config-database.module';
import { AccountModule } from './models/account/account.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './models/product/product.module';
import { ProductInfoModule } from './models/product-info/product-info.module';
import { InStockModule } from './models/in-stock/in-stock.module';
import { CategoryModule } from './models/category/category.module';
import { BillModule } from './models/bill/bill.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigDatabaseModule,
    AccountModule,
    AuthModule,
    ProductModule,
    ProductInfoModule,
    InStockModule,
    CategoryModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
