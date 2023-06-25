import 'dotenv-defaults/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from './infra/config/app.config';
import validationConfig from './infra/config/validation.config';
import { RootModule } from './root.module';

export default async function startApplication() {
	const app = await NestFactory.create(RootModule);
	app.useGlobalPipes(new ValidationPipe(validationConfig));
	await app.listen(config.server.port);
}

startApplication().catch(() => process.exit(1));
