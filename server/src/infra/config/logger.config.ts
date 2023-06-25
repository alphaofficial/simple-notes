import { type Options, stdSerializers } from 'pino-http';
import config from './app.config';

const minLogLevel = process.env.MIN_LOG_LEVEL ?? 'warn';
const coreConfig = {
	customLevels: {
		critical: 100,
	},
	customLogLevel(_req, res, err) {
		if (res.statusCode >= 400 && res.statusCode < 500) {
			return 'warn';
		}
		if (res.statusCode >= 500 || err) {
			return 'error';
		}
		return 'trace';
	},
	serializers: {
		...stdSerializers,
		error: stdSerializers.err,
	},
	formatters: {
		level(level) {
			return { level };
		},
	},
	timestamp: true,
	level: minLogLevel,
};

const isProduction = config.environment.name === 'production';
const loggerConfig: Options = isProduction
	? coreConfig
	: {
			...coreConfig,
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
				},
			},
	  };

export default loggerConfig;
