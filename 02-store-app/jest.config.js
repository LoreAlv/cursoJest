// jest.config.js
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!@bundled-es-modules)'],
  // Configuración de Babel específica para Jest
  globals: {
    'babel-jest': {
      babelConfig: {
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', {runtime: 'automatic'}],
        ],
      },
    },
  },
}
