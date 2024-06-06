import {
    createAccount,
    deleteAccount,
    getAccount,
    getAccounts,
    updateAccount,
} from './account.repo'
import { Account } from '@prisma/client'
import { DatabaseError } from '../../common/errors/database-error/database-error'
import { CreateAccountDto } from './account.dto'

export const createAccountService = async (
    createAccountBody: CreateAccountDto
): Promise<Account> => {
    try {
        const account = await createAccount(createAccountBody)
        return account
    } catch (error: any) {
        throw new DatabaseError(`Failed to create Account: ${error.message}`)
    }
}

export const getAccountsService = async (): Promise<Account[]> => {
    try {
        const account = await getAccounts()
        return account
    } catch (error: any) {
        throw new DatabaseError(`Failed to fetch Accounts: ${error.message}`)
    }
}

export const getAccountByIdService = async (id: string): Promise<Account | null> => {
    try {
        const account = await getAccount(id)
        return account
    } catch (error: any) {
        throw new DatabaseError(`Failed to fetch Account by ID: ${error.message}`)
    }
}

export const updateAccountService = async (
    id: string,
    data: Partial<Account>
): Promise<Account | null> => {
    try {
        const account = await updateAccount(id, data)
        return account
    } catch (error: any) {
        throw new DatabaseError(`Failed to update Account: ${error.message}`)
    }
}

export const deleteAccountService = async (id: string): Promise<Account | null> => {
    try {
        const account = await deleteAccount(id)
        return account
    } catch (error: any) {
        throw new DatabaseError(`Failed to delete Account: ${error.message}`)
    }
}
