module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  testEnvironment: 'jsdom',
  globals: {
    browserName: 'chrome'
  }
};
