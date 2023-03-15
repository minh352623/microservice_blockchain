import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './db/db-config';
import { ExchangeModule } from './exchange/exchange.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SearchModule } from './search/search.module';
// import { SearchModule } from './search/search.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),

    ExchangeModule,
    AuthModule,
    SearchModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
