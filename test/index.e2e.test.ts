import { accountTests } from './modules/account/account.e2e.test'

describe('E2E Test Suite', () => {
    const baseURL = 'http://localhost:3000'

    describe('Account E2E Tests', () => accountTests(baseURL))
})
