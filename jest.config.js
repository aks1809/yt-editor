module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: 'tests/.*\\.test\\.ts$',
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.test.json'
      }
    }
  };
  