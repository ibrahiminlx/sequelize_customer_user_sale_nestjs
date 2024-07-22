/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { Sale } from 'src/db/entity/sale.entity';
import * as jwt from "jsonwebtoken";
@Injectable()
export class SaleService {
    constructor(
        @Inject('SALES_REPOSITORY') 
        private salesRepository: typeof Sale
      ) {}
      async allSales(){
        try {
          return this.salesRepository.findAll()
        } catch (error) {
          throw error;
        }
    
      }
      async findSale(id:number){
        try {
          return this.salesRepository.findByPk(id)
        } catch (error) {
          throw error;
        }
      }
      async createSale(customerId: number, token: string, amount: number): Promise<Sale> {
        try {
          let userId=null
          await jwt.verify(token,process.env.TOKEN_KEY,async (err,data)=>{
            if (err) {
              throw new Error('Token verify error.')
            }else{
              userId=data.userId
            }
          })
          if (userId==null && userId.type!=Number) {
            throw new Error('Kullanici bulunamadi.')
          }
          const customer = await this.salesRepository.create({ customerId, userId, amount });
          return customer;
        } catch (error) {
          throw error;
        }
      }
      async updateSale(id: number,customerId: number, userId: number, amount: number): Promise<Sale> {
        try {
          const [numberOfAffectedRows, [updatedSale]] = await this.salesRepository.update(
            { customerId, userId, amount },
            { where: { id }, returning: true }
          );
          if (numberOfAffectedRows === 0) {
            throw new Error('Müşteri bulunamadı');
          }
          return updatedSale;
        } catch (error) {
          throw error;
        }
      }
      async deleteSale(id:number){
        try {
          await this.salesRepository.destroy({where:{id}})
          return id
        } catch (error) {
          throw error;
        }
      }
}
