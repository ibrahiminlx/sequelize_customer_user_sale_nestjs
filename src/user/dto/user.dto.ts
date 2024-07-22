import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ description: 'Müşterinin id' })
    username: string;
  
    @ApiProperty({ description: 'Kullanici id' })
    password: string;
   
  }