import 'reflect-metadata'
import express, { Request, Response, Application } from 'express'
import * as dotenv from 'dotenv'
import { validateEnvConfig } from './configs/env'
import { envConfig } from './configs/config'
dotenv.config()

try {
    validateEnvConfig(process.env)
    console.log('Environment configuration is valid')

    const app: Application = 
    express()
    const port = envConfig.PORT || 8000

    app.get('/', (req: Request, res: Response) => {
        res.send('Backend Developer Task')
    })

    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`)
    })
} catch (error) {
    console.error('Invalid environment configuration:', error)
    process.exit(1) // Exit the application with an error code
}
