import { UserRoles } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { TokenPayload, RequestWithTokenPayload } from './types'

export const authorizeToken = (...allowedRoles: UserRoles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            console.log('31212', token)
            if (!token) return res.sendStatus(401)
            jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
                if (err) return res.sendStatus(403)
                const newRequest: RequestWithTokenPayload = Object.assign({}, req, {
                    tokenPayload: decoded as TokenPayload,
                })
                if (!allowedRoles.includes(newRequest.tokenPayload.userRole)) {
                    return res.status(403).json({ error: 'Access denied' })
                }
                console.log(decoded)
                next()
            })
        } catch (error) {
            console.log('Error in Authorize Token', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
