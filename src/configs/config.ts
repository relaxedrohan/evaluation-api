import * as dotenv from 'dotenv'
import { NodeEnvironment } from './config.type'
dotenv.config()

export const config: Config = {
    NODE_ENV: process.env.NODE_ENV! as NodeEnvironment,
    PORT: parseInt(process.env.PORT!),
    POSTGRES_URL: process.env.POSTGRES_URL!,
    POSTGRES_USER: process.env.POSTGRES_USER!,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
    POSTGRES_NAME: process.env.POSTGRES_NAME!,
    ADMIN_USER_EMAIL: process.env.ADMIN_USER_EMAIL!,
    ADMIN_USER_PASSWORD: process.env.ADMIN_USER_PASSWORD!,
    JWT_SECRET: process.env.JWT_SECRET!,
    REDIS_HOST: process.env.REDIS_HOST!,
    REDIS_PORT: parseInt(process.env.REDIS_PORT!),
}

interface Config {
    NODE_ENV: NodeEnvironment
    PORT: number
    POSTGRES_URL: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_NAME: string
    ADMIN_USER_EMAIL: string
    ADMIN_USER_PASSWORD: string
    JWT_SECRET: string
    REDIS_HOST: string
    REDIS_PORT: number
}
