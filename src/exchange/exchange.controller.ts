import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExchangeDTO } from './exchange.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createExchange(@Body() exchange: ExchangeDTO) {
    try {
      return this.exchangeService.save(exchange);
    } catch (e) {
      console.log(e);
    }
  }
}
