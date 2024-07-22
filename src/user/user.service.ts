/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/db/entity/user.entity';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
@Injectable()
export class UserService {
    constructor(
        @Inject('USERS_REPOSITORY') 
        private usersRepository: typeof User
      ) {}

      async allUsers(){
        try {
          return this.usersRepository.findAll()
        } catch (error) {
          throw error;
        }
    
      }
      async findUser(id:number){
        try {
          return this.usersRepository.findByPk(id)
        } catch (error) {
          throw error;
        }
      }
      async createUser(username: string, password: string): Promise<User> {
        try {
          let salt = bcrypt.genSaltSync(12);
          let hashPassword = bcrypt.hashSync(password, salt);
          const customer = await this.usersRepository.create({ username, password:hashPassword });
          return customer;
        } catch (error) {
          throw error;
        }
      }
      async loginUser(username: string, password: string) {
        try {
          const user = await this.usersRepository.findOne({ where: { username } });
          if (user && user.password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
              const token = await jwt.sign({userId:user.id},process.env.TOKEN_KEY,{expiresIn:'365d'})
              return {
                user:user,
                token
              }
            }else{
              throw new Error('Yanlis kullanici bilgileri.')
            }
          }
          throw new Error('Kullanici bulunamadi.')
        } catch (error) {
          throw error;
        }
      }
      
      async updateUser(id: number,username: string, password: string): Promise<User> {
        try {
          const [numberOfAffectedRows, [updatedUser]] = await this.usersRepository.update(
            { username, password },
            { where: { id }, returning: true }
          );
          if (numberOfAffectedRows === 0) {
            throw new Error('Müşteri bulunamadı');
          }
          return updatedUser;
        } catch (error) {
          throw error;
        }
      }
      async deleteUser(id:number){
        try {
          return this.usersRepository.destroy({where:{id}})
        } catch (error) {
          throw error;
        }
      }
}
