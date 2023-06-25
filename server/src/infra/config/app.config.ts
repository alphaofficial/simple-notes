const config = Object.freeze({
	database: {
		name: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		port: Number(process.env.PG_PORT) || 5432,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
	},
	server: {
		port: Number(process.env.PORT) || 3300,
		host: process.env.HOST || 'http://localhost',
		name: process.env.NAME || 'API server',
	},
	environment: {
		name: process.env.NODE_ENV,
	},
});

export const isDevelopment = config.environment.name === 'development';
export const isProduction = config.environment.name === 'production';

export default config;
