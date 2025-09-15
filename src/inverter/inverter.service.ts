import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inverter } from './entities/inverter.entity';
import { Repository } from 'typeorm';
@Injectable()
export class InverterService {
  constructor(
    @InjectRepository(Inverter)
    private readonly inverterRepository: Repository<Inverter>,
  ) {}

  async findAll() {
    const inverters = await this.inverterRepository.find();
    return inverters;
  }

  async findOne(id: string) {
    const inverter = await this.inverterRepository.findOneBy({ id });
    return inverter;
  }
}
