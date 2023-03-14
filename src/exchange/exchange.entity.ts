import { BaseEntity } from 'src/common/mysql/base.entity';
import { Column, Double, Entity } from 'typeorm';

@Entity({
  name: 'exchange',
})
export class ExchangeEntity extends BaseEntity {
  @Column()
  name_exchange: string;

  @Column({ type: 'double precision' })
  price_exchange: number;

  @Column()
  quantity_exchange: number;
}
