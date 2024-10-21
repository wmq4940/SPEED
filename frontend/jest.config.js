const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: { '@/pages/(.*)$': '<rootDir>/components/$1' },
  testEnvironment: 'jsdom', // Corrected key
};

module.exports = createJestConfig(customJestConfig);
