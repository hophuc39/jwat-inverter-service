import { Module } from '@nestjs/common';
import { InverterService } from './inverter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inverter } from './entities/inverter.entity';
import { InverterController } from './inverter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inverter])],
  providers: [InverterService],
  controllers: [InverterController],
})
export class InverterModule {}
