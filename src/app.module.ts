import { DbModule } from './db/db.module';
import { CustomerModule } from './customer/customer.module';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule, CustomerModule, SaleModule, UserModule],
})
export class AppModule {}
