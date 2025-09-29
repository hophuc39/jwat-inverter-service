import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getProtoPath } from 'jwat-protobuf';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'inverter',
        protoPath: getProtoPath('INVERTER'),
        url: `localhost:${process.env.PORT}`,
      },
    },
  );

  await app.listen();
}
bootstrap();
