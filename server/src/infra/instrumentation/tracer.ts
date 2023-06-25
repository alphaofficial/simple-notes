import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import {
	ConsoleSpanExporter,
	SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const traceExporter = new ConsoleSpanExporter();

export const otelSDK = new NodeSDK({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: 'NoteService', // update this to a more relevant name for you!
	}),
	spanProcessor: new SimpleSpanProcessor(traceExporter),
	instrumentations: [
		new HttpInstrumentation(),
		new ExpressInstrumentation(),
		new NestInstrumentation(),
	],
});
