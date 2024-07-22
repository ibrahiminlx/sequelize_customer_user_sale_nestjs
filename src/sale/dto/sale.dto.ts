import { ApiProperty } from "@nestjs/swagger";

export class SaleDto {
    @ApiProperty({ description: 'Müşterinin id' })
    customerId: number;
  
    @ApiProperty({ description: 'Kullanici id' })
    userId: number;
  
    @ApiProperty({ description: 'Tutar' })
    amount: number;
  }
export class SaleDtoCreate {
    @ApiProperty({ description: 'Müşterinin id' })
    customerId: number;
  
    @ApiProperty({ description: 'token' })
    token: string;
  
    @ApiProperty({ description: 'Tutar' })
    amount: number;
  }