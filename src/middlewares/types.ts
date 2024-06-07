import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { UserRoles } from '@prisma/client'

export interface TokenPayload extends JwtPayload {
    userId: string
    userRole: UserRoles
}

export interface RequestWithTokenPayload extends Request {
    tokenPayload: TokenPayload
}
