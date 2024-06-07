import { PrismaClient, Prisma, Account } from '@prisma/client'
import { comparePasswords } from '../../common/utils/pass-hashing.util'
import jwt from 'jsonwebtoken'
import { config } from '../../configs/config'

export const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const JWT_SECRET: string = config.JWT_SECRET

export async function getAccountByEmailId(email: string) {
    const where: Prisma.AccountWhereUniqueInput = {
        email,
    }
    try {
        const user = await db.account.findFirst({ where })
        return user
    } catch (error: any) {
        console.log('couldnt retrieve the user', error as string)
    }
}

export const loginUser = async (
    email: string,
    password: string
): Promise<{ account: Account; token: string } | null> => {
    const account = await getAccountByEmailId(email)

    if (account && (await comparePasswords(password, account.password))) {
        const token = jwt.sign({ userId: account.id, email: account.email }, JWT_SECRET, {
            expiresIn: '1h',
        })
        return { account, token }
    }

    return null
}
