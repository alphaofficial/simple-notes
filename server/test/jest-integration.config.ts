/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('../tsconfig.json');

const jestConfig = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        isolatedModules: false,
      },
    ],
  },
  testEnvironment: 'node',
  preset: 'ts-jest',
  displayName: 'Integration',
  globalSetup: `<rootDir>/jest-integration.setup.ts`,
  globalTeardown: `<rootDir>/jest-global-teardown.ts`,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  }),
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: [`<rootDir>/**/?(*.)+(spec|test).[jt]s?(x)`],
};

export default jestConfig;
