import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import apiSpec from './api.json';

export function initializeOpenApi(app: INestApplication) {
  SwaggerModule.setup('api', app, apiSpec as any);
}
