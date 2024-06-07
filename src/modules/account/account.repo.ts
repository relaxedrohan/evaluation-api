import { PrismaClient, Prisma, Account } from '@prisma/client'
import { CreateAccountDto, DeleteAccountResponse } from './account.dto'
import { handlePrismaError } from '../../common/errors/database-error/prisma-error-mapper'
import { ErrorResponse } from '../../common/errors/http-error/error.type'

const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

//TODO: add hashing function and remove the password from the response object
export async function createAccount({
    firstName,
    lastName,
    email,
    phone,
    password,
    birthday,
}: CreateAccountDto): Promise<Account> {
    const data: Prisma.AccountCreateInput = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
        birthday,
    }
    const user = await db.account.create({
        data,
    })
    return user
}

export async function getAccounts() {
    const accounts = await db.account.findMany({})
    return accounts
}

export async function getAccount(id: string) {
    const where: Prisma.AccountWhereUniqueInput = {
        id,
    }
    const user = await db.account.findFirst({ where })
    return user
}

export async function updateAccount(
    id: string,
    accountUpdateData: Partial<Account>
): Promise<Partial<Account> | ErrorResponse> {
    const where: Prisma.AccountWhereUniqueInput = {
        id,
    }
    const data: Prisma.AccountUpdateInput = {
        ...accountUpdateData,
    }
    try {
        const updatedAccount = await db.account.update({ where, data })
        return updatedAccount
    } catch (error: any) {
        return handlePrismaError(error)
    }
}

export async function deleteAccount(id: string): Promise<DeleteAccountResponse | ErrorResponse> {
    const where: Prisma.AccountWhereUniqueInput = {
        id,
    }
    const data: Prisma.AccountUpdateInput = {
        isDeleted: true,
    }
    try {
        const user = await db.account.update({ where, data })
        return {
            isDeleted: user.isDeleted,
        }
    } catch (error: any) {
        return handlePrismaError(error)
    }
}
