const globalTeardown = async (config: any): Promise<void> => {
  console.info('\n', 'Executing teardown for tests');
  if (!config.watch || !config.watchAll) {
    console.info('\n', 'Teardown completed');
    return;
  }

  for (const container of global.containers) {
    await container.stop({ timeout: 10000 });
  }

  console.info('\n', 'Teardown completed');
};

export default globalTeardown;
