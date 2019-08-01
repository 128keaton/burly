const {defaults} = require('jest-config');

module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageDirectory: 'test/coverage',
    testRegex: '/test/burly.test.ts',
    testEnvironment: 'node',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'js'],
};
