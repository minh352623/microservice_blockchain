import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class MysqlBaseService<Entity extends BaseEntity, Dto> {
  constructor(protected repo: Repository<Entity>) {}

  async save(data: Dto): Promise<Dto> {
    const dataNew = await this.repo.save(data as any);

    return dataNew;
  }

  async findAll(
    search?: string,
    page: number = 1,
    totalRow: number = 1,
  ): Promise<any[]> {
    try {
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

  async findOne(id: number): Promise<any> {
    try {
      const data = await this.repo.findOne({
        where: {
          id: id as any,
        },
      });
      if (!data) throw new HttpException('Bad request', HttpStatus.NOT_FOUND);
      console.log(data);

      // return plainToInstance(Userany, user, { excludeExtraneousValues: true });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const dataOld = await this.findOne(id);
      if (!dataOld) throw new NotFoundException();
      //   return plainToInstance(any, user, { excludeExtraneousValues: true });
      //   user.firstName && (userold.firstName = user.firstName);
      //   user.lastName && (userold.lastName = user.lastName);
      //   user.avatar && (userold.avatar = user.avatar);
      //   user.description && (userold.description = user.description);
      //   user.role && (userold.role = user.role);
      //   user.age && (userold.age = user.age);
      //   const userNew = await this.repo.save(userold);

      const updateStatus = await this.repo.update(id, data as any);

      console.log(updateStatus);
      if (updateStatus.affected === 1) {
        return {
          message: 'update succcessfully',
        };
      } else {
        throw new InternalServerErrorException();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async softDeleteOneById(id: number): Promise<any> {
    try {
      const userold = await this.repo.findOne({
        where: {
          id: id as any,
        },
      });
      console.log(userold);
      if (!userold) return 'Delete user successfully';
      const status = await this.repo.softDelete(id);
      return status;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFocreById(id: number): Promise<any> {
    try {
      const userold = await this.repo.findOne({
        where: {
          id: id as any,
        },
        withDeleted: true,
      });
      console.log(userold);
      if (!userold) return 'Delete user force successfully';
      const status = await this.repo.delete(id);
      return status;
    } catch (err) {
      console.log(err);
    }
  }

  async restoreById(id: number): Promise<any> {
    try {
      const userold = await this.repo.findOne({
        where: {
          id: id as any,
        },
        withDeleted: true,
      });
      if (!userold) return 'Restore user soft successfully';
      const status = await this.repo.restore(id);
      return status;
    } catch (err) {
      console.log(err);
    }
  }
}
