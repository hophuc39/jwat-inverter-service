import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Inverter } from './entities/inverter.entity';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import {
  CreateInverterRequest,
  FindAllInvertersRequest,
  UpdateInverterRequest,
} from 'jwat-protobuf/inverter';

@Injectable()
export class InverterRepository extends Repository<Inverter> {
  constructor(private dataSource: DataSource) {
    super(Inverter, dataSource.createEntityManager());
  }

  async findAll(request: FindAllInvertersRequest) {
    const { inverterCode, inverterName, useFlag, page, pageSize } = request;
    const query = this.createQueryBuilder('inv');

    if (inverterName) {
      query.andWhere('inv.inverter_name LIKE :name', {
        name: `%${inverterName}%`,
      });
    }

    if (inverterCode) {
      query.andWhere('inv.inverter_code LIKE :code', {
        code: `%${inverterCode}%`,
      });
    }

    if (useFlag !== undefined) {
      query.andWhere('inv.use_flag = :flag', { flag: useFlag });
    }

    const total = await query.clone().getCount();
    const items = await query
      .orderBy('inv.id')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    console.log(items);

    return [items, total];
  }

  async findById(id: string) {
    const inverter = await this.findOneBy({ id });
    return inverter;
  }

  async createInverter(request: CreateInverterRequest) {
    const {
      inverterCode,
      inverterName,
      useFlag,
      numberOfPoles,
      slaveAddress,
      startAddress,
    } = request;
    const existing = await this.findOneBy({ inverterCode });
    if (existing) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: `Inverter with code ${inverterCode} already exists`,
      });
    }

    const inverter = this.create({
      inverterCode,
      inverterName,
      useFlag,
      numberOfPoles,
      slaveAddress,
      startAddress,
    });

    return await this.save(inverter);
  }

  async updateInverter(request: UpdateInverterRequest) {
    const {
      id,
      inverterName,
      useFlag,
      numberOfPoles,
      slaveAddress,
      startAddress,
    } = request;
    const existing = await this.findOneBy({ id });
    if (!existing) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Inverter with id ${id} is not existed`,
      });
    }

    const updated = this.merge(existing, {
      inverterName,
      useFlag,
      numberOfPoles,
      slaveAddress,
      startAddress,
    });

    return await this.save(updated);
  }
}
