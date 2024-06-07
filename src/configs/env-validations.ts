import { IsString, IsNumber, validateSync, IsEnum, IsEmail, IsNotEmpty } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { NodeEnvironment } from './config.type'

export class EnvValidation {
    @IsNotEmpty()
    @IsEnum(NodeEnvironment)
    NODE_ENV!: NodeEnvironment

    @IsNotEmpty()
    @IsNumber()
    PORT!: number

    @IsNotEmpty()
    @IsString()
    POSTGRES_URL!: string

    @IsNotEmpty()
    @IsString()
    POSTGRES_USER!: string

    @IsNotEmpty()
    @IsString()
    POSTGRES_PASSWORD!: string

    @IsNotEmpty()
    @IsString()
    POSTGRES_NAME!: string

    @IsNotEmpty()
    @IsEmail()
    ADMIN_USER_EMAIL!: string

    @IsNotEmpty()
    @IsString()
    ADMIN_USER_PASSWORD!: string

    @IsNotEmpty()
    @IsString()
    JWT_SECRET!: string

    @IsNotEmpty()
    @IsNumber()
    REDIS_PORT!: number

    @IsNotEmpty()
    @IsString()
    REDIS_HOST!: string
}

export function validateEnvConfig(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvValidation, config, {
        enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    })

    if (errors.length > 0) {
        throw new Error(errors.toString())
    }
}
