import pino, { Logger as BaseLogger } from 'pino';
import loggerConfig from '../config/logger.config';

const client: BaseLogger = pino(loggerConfig);

export default client;
