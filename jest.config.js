const {defaults} = require('jest-config');

module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageDirectory: 'test/coverage',
    testRegex: '/test/.*',
    testEnvironment: 'node',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'js'],
};
