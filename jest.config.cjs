/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  transform: { '^.+\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.base.json' }] },
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/utils/src/**/*.ts',
    '!**/*.d.ts'
  ],
  coverageReporters: ['json-summary', 'lcov', 'text']
};
