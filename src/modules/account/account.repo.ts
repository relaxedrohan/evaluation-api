import { PrismaClient, Prisma, Account } from '@prisma/client'
import { CreateAccountDto } from './account.dto'

const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

export async function createAccount({
    firstName,
    lastName,
    email,
    phone,
    password,
    birthday,
}: CreateAccountDto) {
    const data: Prisma.AccountCreateInput = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: parseInt(phone),
        password,
        birthday,
    }
    const user = await db.account.create({
        data,
    })
    return user
}

export async function getAccounts() {
    const user = await db.account.findMany()
    return user
}

export async function getAccount(id: string) {
    const where: Prisma.AccountWhereUniqueInput = {
        id,
    }
    const user = await db.account.findFirst({ where })
    return user
}

export async function updateAccount(id: string, accountUpdateData: Partial<Account>) {
    const where: Prisma.AccountWhereUniqueInput = {
        id,
    }
    const data: Prisma.AccountUpdateInput = {
        ...accountUpdateData,
    }
    const user = await db.account.update({ where, data })
    return user
}

export async function deleteAccount(id: string) {
    const where: Prisma.AccountWhereUniqueInput = {
        id,
    }
    const data: Prisma.AccountUpdateInput = {
        isDeleted: true,
    }
    const user = await db.account.update({ where, data })
    return user
}
