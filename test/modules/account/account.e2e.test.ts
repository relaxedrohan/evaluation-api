import axios from 'axios'

export const accountTests = (baseURL: string) => {
    describe('Account E2E Tests', () => {
        it('Create Account', async () => {
            const response = await axios.post(`${baseURL}/account`, {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john1.doe@example.com',
                password: 'password123',
                phone: '1234298623', // Ensure phone is a string
            })

            expect(response.status).toBe(200)
            expect(response.data).toHaveProperty('id')
            expect(response.data.email).toBe('john1.doe@example.com')
        })
    })
}
