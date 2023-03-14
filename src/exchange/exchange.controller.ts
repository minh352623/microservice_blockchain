import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Delete,
  Get,
  Query,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExchangeDTO } from './exchange.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('totalRow') totalRow: number,
  ) {
    try {
      console.log(search, page, totalRow);
      return this.exchangeService.findAll(search, page, totalRow);
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/:id')
  getOneUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return this.exchangeService.findOne(id);
    } catch (err) {
      console.log(err);
    }
  }

  // @UseGuards(JwtAuthGuard)

  //{
  // "name_exchange":"ád",
  // "price_exchange":45.7,
  // "number_exchange":2
  // }
  @Post()
  @UseInterceptors(FileInterceptor('test')) // sử dụng cái này mới đọc da dc trong formdata
  createExchange(@Body() exchange: ExchangeDTO) {
    try {
      //check so du

      const money_paid = +exchange.quantity_exchange * +exchange.price_exchange;
      console.log(money_paid);

      return this.exchangeService.save(exchange);
    } catch (e) {
      console.log(e);
    }
  }

  @Put('/update/:id')
  updateExchange(@Param('id') id: number, @Body() exchange: ExchangeDTO) {
    try {
      if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return this.exchangeService.update(id, exchange);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete('/delete/:id')
  deleteExchange(@Param('id') id: number) {
    try {
      if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return this.exchangeService.softDeleteOneById(id);
    } catch (e) {
      console.log(e);
    }
  }
}
