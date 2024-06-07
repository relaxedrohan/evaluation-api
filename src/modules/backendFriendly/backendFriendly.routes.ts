import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { TokenPayload } from '../../middlewares/types'
import { config } from '../../configs/config'

const prisma = new PrismaClient()
const TokenGeneratorBackendFriendlyRouter = Router()

TokenGeneratorBackendFriendlyRouter.post('/', async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const user = await prisma.account.findUnique({ where: { email } })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const tokenPayload: TokenPayload = {
            userId: user.id,
            userRole: user.userRole,
        }

        const token = jwt.sign(tokenPayload, config.JWT_SECRET as string, {
            expiresIn: '1h',
        })

        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: 'Token generation failed' })
    }
})

export default TokenGeneratorBackendFriendlyRouter
