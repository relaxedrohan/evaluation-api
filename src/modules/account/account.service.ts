import {
    createAccount,
    deleteAccount,
    getAccount,
    getAccounts,
    updateAccount,
} from './account.repo'
import { Account } from '@prisma/client'
import { CreateAccountDto, DeleteAccountResponse } from './account.dto'
import { ErrorResponse } from '../../common/errors/http-error/error.type'
import { config } from '../../configs/config'
import { addJobToQueue } from '../../queues/producers/producer'
import { handleServiceError } from '../../common/errors/http-error/internal-server-error'

export const createAccountService = async (
    createAccountBody: CreateAccountDto
): Promise<Account | ErrorResponse> => {
    try {
        const account = await createAccount(createAccountBody)
        if ('error' in account) {
            // Handle the error case
            return account
        } else {
            const sendEmailPayload = {
                email: config.ADMIN_USER_EMAIL,
                username: account.email,
                phone: account.phone,
            }
            await addJobToQueue('SendEmails', 'account-creation', sendEmailPayload)
            return account
        }
    } catch (error: any) {
        return handleServiceError(error)
    }
}

export const getAccountsService = async (
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string
) => {
    try {
        return await getAccounts(page, pageSize, sortBy, sortOrder)
    } catch (error: any) {
        return handleServiceError(error)
    }
}

// todo add return type above .

export const getAccountByIdService = async (
    id: string
): Promise<Account | ErrorResponse | null> => {
    try {
        return await getAccount(id)
    } catch (error: any) {
        return handleServiceError(error)
    }
}

export const updateAccountService = async (
    id: string,
    data: Partial<Account>
): Promise<Partial<Account> | ErrorResponse> => {
    try {
        return await updateAccount(id, data)
    } catch (error: any) {
        return handleServiceError(error)
    }
}

export const deleteAccountService = async (
    id: string
): Promise<DeleteAccountResponse | ErrorResponse> => {
    try {
        return await deleteAccount(id)
    } catch (error: any) {
        return handleServiceError(error)
    }
}
