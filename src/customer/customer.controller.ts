

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { baseResponseFunctionError, baseResponseFunctionSuccess } from 'dto/baseResponse.dto';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
@ApiTags("customer")
export class CustomerController {
    constructor (private readonly customerService:CustomerService){}
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
        summary: "Tum Kullanicilari Getirme",
      })
    async getAllCustomer(){
        try {
            const jsonData = await this.customerService.allCustomers();
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    
    }
    @Get(':id')
    @ApiOperation({ summary: 'Kullanıcıyı Getirme' })
    @ApiParam({ name: 'id', type: Number, description: 'Kullanıcının ID\'si' })
    async getCustomer(@Param('id') id: number){
        try {            
            const jsonData = await this.customerService.findCustomer(id);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
    @Post()
    @ApiOperation({ summary: 'Kullanıcı Kaydetme' })
    @ApiBody({ 
      description: 'Kullanıcı bilgileri',
      type: CustomerDto, 
    })
    async createCustomer(@Body() createCustomerDto: CustomerDto) {
        try { 
            const { name, phone, address } = createCustomerDto;      
            if (!name || !phone || !address) throw new Error('Validation Error')  
            const jsonData = await this.customerService.createCustomer(name,phone,address);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
    @Put(':id')
    @ApiOperation({ summary: 'Kullanıcı Duzenleme' })
    @ApiParam({ name: 'id', type: Number, description: 'Kullanıcının ID\'si' })
    @ApiBody({ 
      description: 'Kullanıcı bilgileri',
      type: CustomerDto, 
    })
    async updateCustomer(@Param('id') id: number,@Body() createCustomerDto: CustomerDto) {
        try { 
            const { name, phone, address } = createCustomerDto;      
            if (!id || (!name && !phone && !address)) throw new Error('Validation Error')  
            const jsonData = await this.customerService.updateCustomer(id,name,phone,address);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Kullanıcıyı Silme' })
    @ApiParam({ name: 'id', type: Number, description: 'Kullanıcının ID\'si' })
    async deleteCustomer(@Param('id') id: number){
        try {            
            const jsonData = await this.customerService.deleteCustomer(id);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
}
