import { ApiProperty } from "@nestjs/swagger";

export class CustomerDto {
    @ApiProperty({ description: 'Müşterinin adı' })
    name: string;
  
    @ApiProperty({ description: 'Müşterinin telefon numarası' })
    phone: string;
  
    @ApiProperty({ description: 'Müşterinin adresi' })
    address: string;
  }