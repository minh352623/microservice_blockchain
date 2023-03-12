import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ExchangeEntity } from 'src/exchange/exchange.entity';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'aioshima',
      database: 'crypto_blockchain_new',
      synchronize: true,
      // dropSchema: true,
      // logging: true,
      entities: [ExchangeEntity],
    };
  }
}
