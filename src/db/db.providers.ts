import { Sequelize } from 'sequelize-typescript';
import { User } from './entity/user.entity';
import { Customer } from './entity/customer.entity';
import { Sale } from './entity/sale.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username:  process.env.DB_USER,
        password:  process.env.DB_PASSWORD,
        database:  process.env.DB_NAME,
      });
      sequelize.addModels([User,Customer,Sale]);
      await sequelize.sync();
      return sequelize;
    },
  },
];