import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlContainer, StartedTestContainer } from 'testcontainers';

let firstRun = true;

global.containers = new Array<StartedTestContainer>();

const globalBefore = async (): Promise<void> => {
  process.env.SYSTEM_TEST_FIRST_RUN = firstRun ? 'yes' : 'no';

  if (!firstRun) {
    console.info('\n', 'Test containers setup skipped, already started');
    return;
  }

  console.info('\n', 'Setup started');

  const container = await new PostgreSqlContainer('postgres:15.2').start();
  const mappedPort = container.getFirstMappedPort();

  console.info(
    '\n',
    `Started DB container "${container.getName()}" on port "${mappedPort}"`,
  );
  global.containers.push(container);

  process.env.NODE_ENV = 'system-tests';
  //Postgres connection
  process.env.PG_HOST = container.getHost();
  process.env.PG_USER = container.getUsername();
  process.env.PG_PASSWORD = container.getPassword();
  process.env.PG_DATABASE = container.getDatabase();
  process.env.PG_PORT = container.getPort().toString();

  console.info('\n', 'Executing database migrations');
  const ormOptions = (await import('../src/infra/config/orm.config')).default;
  const orm = await MikroORM.init(ormOptions);
  await orm.getMigrator().up();
  console.info('\n', 'Executing database migrations done');

  await orm.close();

  firstRun = false;
};

export default globalBefore;
