const config = Object.freeze({
  database: {
    name: process.env.SQLITE_DB_NAME,
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
