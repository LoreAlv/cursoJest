import 'whatwg-fetch'

module.exports = {
  // testEnvironment: 'jest-environment-jsdom',
  // inside your jest.setup.js
  testEnvironment: './jest.environment.js',

  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],

  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
  },
}
