import {
    createAccount,
    deleteAccount,
    getAccount,
    getAccounts,
    updateAccount,
} from './account.repo'
import { Account } from '@prisma/client'
import { CreateAccountDto, DeleteAccountResponse } from './account.dto'
import { handlePrismaError } from '../../common/errors/database-error/prisma-error-mapper'
import { ErrorResponse } from '../../common/errors/http-error/error.type'

export const createAccountService = async (
    createAccountBody: CreateAccountDto
): Promise<Account | ErrorResponse> => {
    try {
        return await createAccount(createAccountBody)
    } catch (error: any) {
        return handlePrismaError(error)
    }
}

export const getAccountsService = async () => {
    try {
        return await getAccounts()
    } catch (error: any) {
        return handlePrismaError(error)
    }
}

// todo:will add return type above later.

export const getAccountByIdService = async (
    id: string
): Promise<Account | ErrorResponse | null> => {
    try {
        return await getAccount(id)
    } catch (error: any) {
        return handlePrismaError(error)
    }
}

export const updateAccountService = async (
    id: string,
    data: Partial<Account>
): Promise<Partial<Account> | ErrorResponse> => {
    try {
        return await updateAccount(id, data)
    } catch (error: any) {
        return handlePrismaError(error)
    }
}

export const deleteAccountService = async (
    id: string
): Promise<DeleteAccountResponse | ErrorResponse> => {
    try {
        return await deleteAccount(id)
    } catch (error: any) {
        return handlePrismaError(error)
    }
}
