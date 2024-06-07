import express, { Request, Response } from 'express'
import * as accountService from './account.service'
import { CreateAccountDto, PaginationQueryParams } from './account.dto'
import { validateBodyDto } from '../../common/middlewares/validate-body-dto.middleware'
import { UserRoles } from '@prisma/client'
import { authorizeToken } from '../../middlewares/authorizeToken'
import {
    validatePaginationParams,
    validateSortParams,
} from '../../common/utils/pagination-query-validator'

const accountsRouters = express.Router()

accountsRouters.get('/', authorizeToken(UserRoles.ADMIN), async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            pageSize = 10,
            sortBy = 'created_at',
            sortOrder = 'desc',
        }: PaginationQueryParams = req.query

        validatePaginationParams(page, pageSize)
        validateSortParams(sortBy, sortOrder)

        const accounts = await accountService.getAccountsService(
            +page,
            +pageSize,
            sortBy as string,
            sortOrder as string
        )
        res.json(accounts)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

accountsRouters.post(
    '/',
    validateBodyDto(CreateAccountDto),
    async (req: Request, res: Response) => {
        try {
            const createAccountBody: CreateAccountDto = req.body
            const account = await accountService.createAccountService(createAccountBody)
            res.json(account)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
)

// GET /users/:id
accountsRouters.get('/:id', async (req: Request, res: Response) => {
    try {
        const accountId = req.params.id
        const account = await accountService.getAccountByIdService(accountId)
        res.json(account)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// PUT /users/:id
accountsRouters.put('/:id', async (req: Request, res: Response) => {
    try {
        const accountId = req.params.id
        const updateAccountBody = req.body
        const updatedAccount = await accountService.updateAccountService(
            accountId,
            updateAccountBody
        )
        res.json(updatedAccount)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE /users/:id
accountsRouters.delete(
    '/:id',
    authorizeToken(UserRoles.ADMIN),
    async (req: Request, res: Response) => {
        try {
            const accountId = req.params.id
            const deletedAccount = await accountService.deleteAccountService(accountId)
            res.json(deletedAccount)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
)

export default accountsRouters
