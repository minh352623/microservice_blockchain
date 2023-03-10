import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeController } from './exchange.controller';
import { ExchangeEntity } from './exchange.entity';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeEntity])],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
