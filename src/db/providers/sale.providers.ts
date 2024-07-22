
import { Sale } from '../entity/sale.entity';

export const saleProviders = [
  {
    provide: 'SALES_REPOSITORY',
    useValue: Sale,
  },
]