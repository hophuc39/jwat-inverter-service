import { Injectable } from '@nestjs/common';
import { InverterRepository } from './inverter.repository';
import {
  CreateInverterRequest,
  FindAllInvertersRequest,
  UpdateInverterRequest,
} from 'jwat-protobuf/inverter';

@Injectable()
export class InverterService {
  constructor(private readonly inverterRepository: InverterRepository) {}

  async create(request: CreateInverterRequest) {
    return await this.inverterRepository.createInverter(request);
  }

  async update(request: UpdateInverterRequest) {
    return await this.inverterRepository.updateInverter(request);
  }

  async findAll(request: FindAllInvertersRequest) {
    return await this.inverterRepository.findAll(request);
  }

  async findOne(id: string) {
    return await this.inverterRepository.findById(id);
  }
}
