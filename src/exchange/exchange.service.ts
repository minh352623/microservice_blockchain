import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlBaseService } from 'src/common/mysql/base.service';
import { Repository } from 'typeorm';
import { ExchangeDTO } from './exchange.dto';
import { ExchangeEntity } from './exchange.entity';

@Injectable()
export class ExchangeService extends MysqlBaseService<
  ExchangeEntity,
  ExchangeDTO
> {
  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeRepository: Repository<ExchangeEntity>,
  ) {
    super(exchangeRepository);
  }
}
