import 'dotenv-defaults/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import config from './infra/config/app.config';
import validationConfig from './infra/config/validation.config';
import { RootModule } from './root.module';

export default async function startApplication() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);
  // initializeOpenApi(app);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.disable('x-powered-by');
  await app.listen(config.server.port);
}

startApplication().catch(() => process.exit(1));
