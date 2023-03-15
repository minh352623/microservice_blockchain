import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlBaseService } from 'src/common/postgres/base.service';
import { SearchService } from 'src/search/search.service';
// import { SearchService } from 'src/search/search.service';
import { Repository } from 'typeorm';
import { ExchangeDTO } from './exchange.dto';
import { ExchangeEntity } from './exchange.entity';
import PostsSearchService from './exchangeSearch.service';

@Injectable()
export class ExchangeService extends MysqlBaseService<
  ExchangeEntity,
  ExchangeDTO
> {
  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeRepository: Repository<ExchangeEntity>,

    private readonly searchService: SearchService,
  ) {
    super(exchangeRepository);
  }
  async save(data: ExchangeDTO): Promise<ExchangeDTO> {
    const dataNew = await this.repo.save(data as any);
    console.log('abcbcbc');

    const test = await this.searchService.indexPost(dataNew);
    console.log(test);

    return dataNew;
  }

  async findAll(
    search?: string,
    page: number = 1,
    totalRow: number = 1,
  ): Promise<any[]> {
    try {
      const results = await this.searchService.search(search);
      console.log('search');

      console.log(results);
      return results;
      let _response: Object = [];
      const take = totalRow || 2;
      const skip = (page - 1) * totalRow;
      const [result, total] = await this.repo.findAndCount({
        take: take,
        skip: skip,
      });

      _response = result;
      return {
        data: _response,
        count: total,
      } as any;
    } catch (e) {
      console.log(e);
    }
  }
}
