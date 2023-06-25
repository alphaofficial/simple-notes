import 'dotenv-defaults/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from './infra/config/app.config';
import validationConfig from './infra/config/validation.config';
import { RootModule } from './root.module';
import { initializeOpenApi } from './tools/openapi';

export default async function startApplication() {
  const app = await NestFactory.create(RootModule);
  initializeOpenApi(app);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  await app.listen(config.server.port);
}

startApplication().catch(() => process.exit(1));
