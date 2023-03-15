import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ExchangeEntity } from './exchange.entity';
import { ExchagneSearchBody } from './interface/ExchagneSearchBody.interface';
import { ExchagngeSearchResult } from './interface/ExchagngeSearchResult.interface';

@Injectable()
export default class PostsSearchService {
  index = 'exchange';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(exchange: ExchangeEntity) {
    return this.elasticsearchService.index<ExchagneSearchBody>({
      index: this.index,
      body: {
        id: exchange.id,
        price_exchange: exchange.price_exchange,
        name_exchange: exchange.name_exchange,
        quantity_exchange: exchange.quantity_exchange,
      },
    });
  }

  async search(text: string) {
    const body = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          //   multi_match: {
          //     query: text,
          //     fields: ['name_exchange', 'price_exchange'],
          //   },
          match_all: {},
        },
      },
    });
    console.log(body);

    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
