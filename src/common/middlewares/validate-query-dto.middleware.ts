import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

export function validateQueryDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject: object = plainToInstance(dtoClass, req.query)
        const errors = await validate(dtoObject)

        if (errors.length > 0) {
            const errorMessages = errors
                .map((error) => Object.values(error.constraints || {}))
                .flat()
            return res.status(400).json({ errors: errorMessages })
        }

        next()
    }
}
