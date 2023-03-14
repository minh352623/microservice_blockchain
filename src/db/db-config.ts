import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ExchangeEntity } from 'src/exchange/exchange.entity';
import 'dotenv/config';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      // dropSchema: true,
      // logging: true,
      entities: [ExchangeEntity],
    };
  }
}
