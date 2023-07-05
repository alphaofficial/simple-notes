import 'dotenv-defaults/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import config from './infra/config/app.config';
import validationConfig from './infra/config/validation.config';
import { RootModule } from './root.module';
import { initializeOpenApi } from './tools/openapi';

export default async function startApplication() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);
  app.enableCors({
    origin: '*', // TODO: change this to a whitelist of allowed origins
  });
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.disable('x-powered-by');
  initializeOpenApi(app);
  await app.listen(config.server.port);
}

startApplication().catch(() => process.exit(1));
