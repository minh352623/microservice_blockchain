import { MinLength, IsNumber } from 'class-validator';

export class ExchangeDTO {
  @MinLength(4)
  name_exchange: string;

  @IsNumber()
  price_exchange: number;

  @IsNumber()
  quantity_exchange: number;
}
