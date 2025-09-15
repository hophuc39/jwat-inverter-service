import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'inverter',
        protoPath: join(process.cwd(), 'proto/inverter.proto'),
        url: `localhost:${process.env.PORT}`,
      },
    },
  );

  await app.listen();
}
bootstrap();
