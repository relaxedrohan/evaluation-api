import { IsString, IsNumber, validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";

export class EnvValidation {
  @IsString()
  NODE_ENV!: string;

  @IsNumber()
  PORT!: number;

  //   @IsString()
  //   DB_HOST!: string;

  //   @IsInt()
  //   DB_PORT!: number;

  //   @IsString()
  //   DB_USER!: string;

  //   @IsString()
  //   DB_PASS!: string;

  //   @IsOptional()
  //   @IsString()
  //   DB_NAME!: string;
}

export function validateEnvConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvValidation, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
}
