import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreateAccountDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    firstName!: string

    @IsOptional()
    @IsString()
    @Length(3, 100)
    lastName?: string

    @IsNotEmpty()
    @IsEmail()
    @Length(8, 100)
    email!: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 16)
    phone!: number

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    password!: string

    @IsOptional()
    @IsString()
    @Length(10, 10, { message: 'Date format should be "yyyy-mm-dd"' })
    birthday?: string
}

export class UpdateAccountDto {
    @IsOptional()
    @IsString()
    @Length(3, 100)
    firstName?: string

    @IsOptional()
    @IsString()
    @Length(3, 100)
    lastName?: string

    @IsOptional()
    @IsString()
    @Length(1, 50)
    password?: string

    @IsOptional()
    @IsString()
    @Length(10, 10, { message: 'Date format should be "yyyy-mm-dd"' })
    birthday?: string
}
