import { OperationOptions } from 'retry';

const isTestingEnv = process.env.NODE_ENV === 'test';

const defaultRetryPolicy: OperationOptions = Object.freeze({
  retries: 2,
  factor: 2,
  minTimeout: isTestingEnv ? 0 : 1000,
  maxTimeout: isTestingEnv ? 0 : 3000,
  randomize: false,
});

export default defaultRetryPolicy;
