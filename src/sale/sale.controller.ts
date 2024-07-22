/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { baseResponseFunctionError, baseResponseFunctionSuccess } from 'dto/baseResponse.dto';
import { SaleDto, SaleDtoCreate } from './dto/sale.dto';

@Controller('sale')
@ApiTags("sale")
export class SaleController {
    constructor (private readonly saleService:SaleService){}
    @Get('/healtcheck')
    async healthCheck(){
        try {
            const data={
                uptime:process.uptime(),
                message:'OK',
                date: new Date()
            }
            return data
        } catch (error) {
            return error
        }
    }
    @Get()
    @ApiOperation({
        summary: "Tum Satislari Getirme",
      })
    async getAllSale(){
        try {
            const jsonData = await this.saleService.allSales();
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    
    }
    @Get(':id')
    @ApiOperation({ summary: 'Satis Getirme' })
    @ApiParam({ name: 'id', type: Number, description: 'Satis ID\'si' })
    async getSale(@Param('id') id: number){
        try {            
            const jsonData = await this.saleService.findSale(id);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
    @Post()
    @ApiOperation({ summary: 'Satis olusturma.' })
    @ApiBody({ 
      description: 'Satis bilgileri',
      type: SaleDtoCreate, 
    })
    async createSale(@Body() createSaleDto: SaleDtoCreate) {
        try { 
            const { amount,customerId,token } = createSaleDto;      
            if (!amount || !customerId || !token) throw new Error('Validation Error')  
            const jsonData = await this.saleService.createSale(customerId,token,amount);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          } 
    }
    @Put(':id')
    @ApiOperation({ summary: 'Satis Duzenleme' })
    @ApiParam({ name: 'id', type: Number, description: 'Satis ID\'si' })
    @ApiBody({ 
      description: 'Satis bilgileri',
      type: SaleDto, 
    })
    async updateSale(@Param('id') id: number,@Body() createSaleDto: SaleDto) {
        try { 
            const { amount,customerId,userId } = createSaleDto;     
            if (!id || (!amount && !customerId && !userId)) throw new Error('Validation Error')  
            const jsonData = await this.saleService.updateSale(id,customerId,userId,amount);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Satis Silme' })
    @ApiParam({ name: 'id', type: Number, description: 'Satis ID\'si' })
    async deleteSale(@Param('id') id: number){
        try {            
            const jsonData = await this.saleService.deleteSale(id);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
}
