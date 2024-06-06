import express, { Request, Response } from 'express'
import * as accountService from './account.service'
import { CreateAccountDto } from './account.dto'
import { validateDto } from '../../common/middlewares/validate-dto'
const accountsRouters = express.Router()

accountsRouters.get('/', async (req: Request, res: Response) => {
    try {
        const users = await accountService.getAccountsService()
        res.json(users)
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
        const userId = req.params.id
        const user = await accountService.getAccountByIdService(userId)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// PUT /users/:id
accountsRouters.put('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const updateUserBody = req.body
        const updatedUser = await accountService.updateAccountService(userId, updateUserBody)
        if (updatedUser) {
            res.json(updatedUser)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE /users/:id
accountsRouters.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const deletedUser = await accountService.deleteAccountService(userId)
        if (deletedUser) {
            res.json(deletedUser)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

export default accountsRouters
