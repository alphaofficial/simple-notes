import { EntityCaseNamingStrategy, Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { isProduction } from './app.config';

const ormOptions: Options = {
  type: 'sqlite',
  entities: ['**/schema/*.schema.js'],
  entitiesTs: ['**/schema/*.schema.ts'],
  dbName: 'test.db',
  debug: !isProduction,
  driver: SqliteDriver,
  namingStrategy: EntityCaseNamingStrategy,
  highlighter: new SqlHighlighter(),
  migrations: {
    path: 'dist/infra/persistence/database/migrations',
    pathTs: 'src/infra/persistence/database/migrations',
  },
};

export default ormOptions;
