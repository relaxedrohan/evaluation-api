import express, { Request, Response } from 'express'
import * as accountService from './account.service'
import { CreateAccountDto } from './account.dto'
import { validateDto } from '../../common/middlewares/validate-dto'
import { UserRoles } from '@prisma/client'
import { authorizeToken } from '../../middlewares/authorizeToken'
const accountsRouters = express.Router()

accountsRouters.get('/', async (req: Request, res: Response) => {
    try {
        const accounts = await accountService.getAccountsService()
        res.json(accounts)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

accountsRouters.post('/', validateDto(CreateAccountDto), async (req: Request, res: Response) => {
    try {
        const createAccountBody: CreateAccountDto = req.body
        const account = await accountService.createAccountService(createAccountBody)
        res.json(account)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

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
