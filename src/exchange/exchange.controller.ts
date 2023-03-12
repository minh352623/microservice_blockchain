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
} from '@nestjs/common';
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
  @Post()
  createExchange(@Body() exchange: ExchangeDTO) {
    try {
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
      return this.exchangeService.deleteFocreById(id);
    } catch (e) {
      console.log(e);
    }
  }
}
