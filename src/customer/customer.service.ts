/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { Customer } from 'src/db/entity/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMERS_REPOSITORY') 
        private customersRepository: typeof Customer
      ) {}

      async allCustomers(){
        try {
          return this.customersRepository.findAll()
        } catch (error) {
          throw error;
        }
    
      }
      async findCustomer(id:number){
        try {
          return this.customersRepository.findByPk(id)
        } catch (error) {
          throw error;
        }
      }
      async createCustomer(name: string, phone: string, address: string): Promise<Customer> {
        try {
          const customer = await this.customersRepository.create({ name, phone, address });
          return customer;
        } catch (error) {
          throw error;
        }
      }
      async updateCustomer(id: number, name: string, phone: string, address: string): Promise<Customer> {
        try {
          const [numberOfAffectedRows, [updatedCustomer]] = await this.customersRepository.update(
            { name, phone, address },
            { where: { id }, returning: true }
          );
          if (numberOfAffectedRows === 0) {
            throw new Error('Müşteri bulunamadı');
          }
          return updatedCustomer;
        } catch (error) {
          throw error;
        }
      }
      async deleteCustomer(id:number){
        try {
          await this.customersRepository.destroy({where:{id}})
          return id
        } catch (error) {
          throw error;
        }
      }
}
