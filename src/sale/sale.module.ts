import { saleProviders } from 'src/db/providers/sale.providers';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SaleController],
  providers: [SaleService,...saleProviders],
})
export class SaleModule {}
