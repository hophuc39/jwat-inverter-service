import { Module } from '@nestjs/common';
import { InverterService } from './inverter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inverter } from './entities/inverter.entity';
import { InverterController } from './inverter.controller';
import { InverterRepository } from './inverter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Inverter])],
  providers: [InverterService, InverterRepository],
  controllers: [InverterController],
})
export class InverterModule {}
