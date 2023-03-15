import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ExchangeEntity } from 'src/exchange/exchange.entity';
import { ExchagneSearchBody } from 'src/exchange/interface/ExchagneSearchBody.interface';
import { ExchagngeSearchResult } from 'src/exchange/interface/ExchagngeSearchResult.interface';

@Injectable()
export class SearchService {
  index = 'exchange';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(exchange: ExchangeEntity) {
    return this.elasticsearchService.index<ExchagneSearchBody>({
      index: this.index,
      document: {
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
          multi_match: {
            query: text,
            fields: ['name_exchange', 'price_exchange'],
          },
        },
      },
    });
    console.log(body);

    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
