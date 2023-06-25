import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { PostgreSqlDriver, Options } from '@mikro-orm/postgresql'; // or any other driver package
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import config, { isProduction } from './app.config';

const ormOptions: Options = {
	type: 'postgresql',
	entities: ['**/schema/*.schema.js'],
	entitiesTs: ['**/schema/*.schema.ts'],
	dbName: config.database.name,
	host: config.database.host,
	port: config.database.port,
	user: config.database.user,
	password: config.database.password,
	debug: !isProduction,
	driver: PostgreSqlDriver,
	namingStrategy: EntityCaseNamingStrategy,
	highlighter: new SqlHighlighter(),
	migrations: {
		path: 'dist/infra/persistence/database/migrations',
		pathTs: 'src/infra/persistence/database/migrations',
	},
};

export default ormOptions;
