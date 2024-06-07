import { comparePasswords, hashPassword } from '../../common/utils/pass-hashing.util'
import { db } from './auth.repo'
import { Account } from '@prisma/client'

export const createUser = async (data: {
    email: string
    password: string
    firstName: string
    lastName?: string
    phone: string
    birthday?: string
}): Promise<Account> => {
    const hashedPassword = await hashPassword(data.password)
    return db.account.create({
        data: {
            first_name: data.firstName,
            ...data,
            password: hashedPassword,
        },
    })
}

export const loginUser = async (email: string, password: string): Promise<Account | null> => {
    const user = await db.account.findUnique({
        where: { email },
    })

    if (user && (await comparePasswords(password, user.password))) {
        return user
    }

    return null
}
