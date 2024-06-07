import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    // Indicates which environment should be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/*.test.ts', '**/*.spec.ts'],

    // Transform files with ts-jest
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },

    // Ignore node_modules directory
    // This is the default behavior, but explicitly mentioned here for clarity
    modulePathIgnorePatterns: ['<rootDir>/node_modules/'],

    // Coverage configuration
    coverageDirectory: 'coverage',
    collectCoverage: true,
    testTimeout: 50000,
}

export default config
