module.exports = {
    preset: 'jest-puppeteer',
    testMatch: ['**/__tests__/**/*.test.js?(x)'],

    globals: {
        browserName: 'firefox'
    }
};      