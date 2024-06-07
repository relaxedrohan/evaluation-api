import * as bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    try {
        const hash = await bcrypt.hashSync(password, 10)
        return hash.slice(0, 49)
    } catch (error) {
        throw new Error('Error hashing password')
    }
}

export async function comparePasswords(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
    return isMatch
}
