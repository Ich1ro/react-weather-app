module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
      '^.+\\.css$': 'jest-transform-stub',
      '^.+\\.svg$': 'jest-svg-transformer',
    },
  };