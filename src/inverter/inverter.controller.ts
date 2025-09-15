import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { InverterService } from './inverter.service';
import { InverterIdRequest } from 'proto/inverter';

@Controller()
export class InverterController {
  constructor(private readonly inverterService: InverterService) {}

  @GrpcMethod('InverterService', 'FindAll')
  async findAll() {
    const inverters = await this.inverterService.findAll();
    return {
      items: Array.isArray(inverters) ? inverters : [],
    };
  }

  @GrpcMethod('InverterService', 'FindOne')
  async findOne(data: InverterIdRequest) {
    const inverter = await this.inverterService.findOne(data.id);

    if (!inverter) {
      throw new RpcException({
        message: `Inverter with ID ${data.id} not found`,
      });
    }

    return inverter;
  }
}
