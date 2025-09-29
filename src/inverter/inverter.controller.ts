import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { InverterService } from './inverter.service';
import {
  CreateInverterRequest,
  FindAllInvertersRequest,
  FindInverterByIdRequest,
  UpdateInverterRequest,
} from 'jwat-protobuf/inverter';

@Controller()
export class InverterController {
  constructor(private readonly inverterService: InverterService) {}

  @GrpcMethod('InverterService', 'CreateInverter')
  async create(request: CreateInverterRequest) {
    const inverter = await this.inverterService.create(request);
    return { item: inverter };
  }

  @GrpcMethod('InverterService', 'UpdateInverter')
  async update(request: UpdateInverterRequest) {
    const inverter = await this.inverterService.update(request);
    return { item: inverter };
  }

  @GrpcMethod('InverterService', 'FindAllInverters')
  async findAll(request: FindAllInvertersRequest) {
    const { page, pageSize } = request;
    const [items, total] = await this.inverterService.findAll(request);

    return {
      items,
      pagination: {
        total,
        page,
        pageSize,
      },
    };
  }

  @GrpcMethod('InverterService', 'FindInverterById')
  async findOne(request: FindInverterByIdRequest) {
    const { id } = request;
    const inverter = await this.inverterService.findOne(id);

    if (!inverter) {
      throw new RpcException({
        message: `Inverter with ID ${id} not found`,
      });
    }

    return {
      item: inverter,
    };
  }
}
