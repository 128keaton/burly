module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageDirectory: 'test/coverage',
    testRegex: '/test/burly.test.ts',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
};
