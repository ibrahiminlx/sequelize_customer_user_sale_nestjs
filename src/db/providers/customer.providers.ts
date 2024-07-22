
import { Customer } from '../entity/customer.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useValue: Customer,
  },
]