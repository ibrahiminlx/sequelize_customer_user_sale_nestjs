/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { baseResponseFunctionError, baseResponseFunctionSuccess } from 'dto/baseResponse.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
@ApiTags("user")
export class UserController {
    constructor (private readonly userService:UserService){}
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
    @Post('login')
    @ApiOperation({ summary: 'Kullanici Login.' })
    @ApiBody({ 
      description: 'Kullanici bilgileri',
      type: UserDto, 
    })
    async loginUser(@Body() createUserDto: UserDto) {
        try { 
            const { username,password } = createUserDto;      
            if (!username || !password ) throw new Error('Validation Error')  
            const jsonData = await this.userService.loginUser(username,password);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          } 
    }
    @Get()
    @ApiOperation({
        summary: "Tum Kullanicilari Getirme",
      })
    async getAllUser(){
        try {
            const jsonData = await this.userService.allUsers();
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    
    }
    @Get(':id')
    @ApiOperation({ summary: 'Kullanici Getirme' })
    @ApiParam({ name: 'id', type: Number, description: 'Kullanici ID\'si' })
    async getUser(@Param('id') id: number){
        try {            
            const jsonData = await this.userService.findUser(id);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
    @Post()
    @ApiOperation({ summary: 'Kullanici olusturma.' })
    @ApiBody({ 
      description: 'Kullanici bilgileri',
      type: UserDto, 
    })
    async createUser(@Body() createUserDto: UserDto) {
        try { 
            const { username,password } = createUserDto;      
            if (!username || !password ) throw new Error('Validation Error')  
            const jsonData = await this.userService.createUser(username,password);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          } 
    }
    @Put(':id')
    @ApiOperation({ summary: 'Kullanici Duzenleme' })
    @ApiParam({ name: 'id', type: Number, description: 'Satis ID\'si' })
    @ApiBody({ 
      description: 'Satis bilgileri',
      type: UserDto, 
    })
    async updateUser(@Param('id') id: number,@Body() createUserDto: UserDto) {
        try { 
            const { username,password } = createUserDto;    
            if (!id || (!username && !password )) throw new Error('Validation Error')  
            const jsonData = await this.userService.updateUser(id,username,password);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Kullanici Silme' })
    @ApiParam({ name: 'id', type: Number, description: 'Kullanici ID\'si' })
    async deleteUser(@Param('id') id: number){
        try {            
            const jsonData = await this.userService.deleteUser(id);
            return baseResponseFunctionSuccess({ data: jsonData });
          } catch (error) {
            return baseResponseFunctionError({ data: error?.message });
          }
    }
}
