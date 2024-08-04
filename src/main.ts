import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonLogger } from './shared/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new WinstonLogger(),
  });
  await app.listen(3000);
}

bootstrap();
