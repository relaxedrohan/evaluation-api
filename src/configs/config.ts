import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_NAME: process.env.POSTGRES_NAME,
}
