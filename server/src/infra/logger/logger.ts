import { BaseLogger } from 'pino';
import client from './client';
import { LoggerInterface } from '@/api/interfaces/logger.interface';

export class Logger implements LoggerInterface {
  constructor(private readonly client: BaseLogger) {}
  info(
    scope: string,
    message: string,
    params?: Record<string, unknown>,
    tags?: string[],
  ): void {
    this.client.info(params, `[${scope}] ${message}`, tags);
  }

  error(
    scope: string,
    message: string,
    params?: Record<string, unknown>,
    tags?: string[],
  ): void {
    this.client.error(params, `[${scope}] ${message}`, tags);
  }

  warn(
    scope: string,
    message: string,
    params?: Record<string, unknown>,
    tags?: string[],
  ) {
    this.client.warn(params, `[${scope}] ${message}`, tags);
  }

  debug(
    scope: string,
    message: string,
    params?: Record<string, unknown>,
    tags?: string[],
  ) {
    this.client.debug(params, `[${scope}] ${message}`, tags);
  }

  trace(
    scope: string,
    message: string,
    params?: Record<string, unknown>,
    tags?: string[],
  ) {
    this.client.trace(params, `[${scope}] ${message}`, tags);
  }
}

export const logger = new Logger(client);
