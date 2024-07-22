import { customerProviders } from 'src/db/providers/customer.providers';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService,...customerProviders],
})
export class CustomerModule {}
