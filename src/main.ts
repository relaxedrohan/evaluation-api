import 'reflect-metadata'
import express, { Request, Response, Application } from 'express'
import { validateEnvConfig } from './configs/env-validations'
import { config } from './configs/config'
import accountsRouters from './modules/account/account.routes'
import TokenGeneratorRouter from './modules/backendFriendly/backendFriendly.routes'
import { createQueues } from './queues'
import { processQueues } from './queues/consumer'

export default function startServer() {
    try {
        validateEnvConfig(process.env)
        console.log('Environment configuration is valid')

        const app: Application = express()
        const port = config.PORT || 8000

        app.use(express.json())
        app.use(express.text())
        app.use(express.urlencoded({ extended: false }))
        app.use('/generateToken', TokenGeneratorRouter)

        app.use('/account', accountsRouters)

        app.get('/', (req: Request, res: Response) => {
            res.send('Backend Developer Task')
        })

        createQueues()
        processQueues()

        app.listen(port, () => {
            console.info(`connected to ${config.NODE_ENV} db`)
            console.info(`${config.NODE_ENV} Server is Fire at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Error Starting up the servers', error)
        process.exit(1) // Exit the application with an error code
    }
}

startServer()
