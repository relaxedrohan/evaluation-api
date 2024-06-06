import { IsString, IsNumber, validateSync, IsEnum } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { NodeEnvironment } from './config.enum'

export class EnvValidation {
    @IsEnum(NodeEnvironment)
    NODE_ENV!: NodeEnvironment

    @IsNumber()
    PORT!: number

    @IsString()
    POSTGRES_URL!: string

    @IsString()
    POSTGRES_USER!: string

    @IsString()
    POSTGRES_PASSWORD!: string

    @IsString()
    POSTGRES_NAME!: string
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
