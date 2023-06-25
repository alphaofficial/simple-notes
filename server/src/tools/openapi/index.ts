import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

export function initializeOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NotesApp API')
    .setDescription('The NotesApp API description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  const dir = path.join(process.cwd(), 'src', 'shared', 'openapi', 'api.json');
  fs.writeFileSync(dir, JSON.stringify(document));

  SwaggerModule.setup('api', app, document);
}
