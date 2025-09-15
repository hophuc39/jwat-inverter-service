import { Module } from '@nestjs/common';
import { InverterModule } from './inverter/inverter.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    InverterModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
