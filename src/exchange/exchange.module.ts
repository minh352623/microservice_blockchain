import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
// import { SearchModule } from 'src/search/search.module';
// import { SearchService } from 'src/search/search.service';
import { ExchangeController } from './exchange.controller';
import { ExchangeEntity } from './exchange.entity';
import { ExchangeService } from './exchange.service';
import PostsSearchService from './exchangeSearch.service';
require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeEntity]), SearchModule],
  providers: [ExchangeService],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
