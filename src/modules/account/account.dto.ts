import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    IsInt,
    Max,
    Min,
} from 'class-validator'

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
    phone!: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    password!: string

    @IsOptional()
    @IsDateString(
        { strict: true },
        {
            message: 'Date must be in the format "yyyy-mm-dd"',
        }
    )
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

export interface PaginatedAccountsRequest extends Request {
    query: {
        after?: string
        before?: string
        batchSize?: string
    }
}

export class DeleteAccountResponse {
    @IsBoolean()
    isDeleted!: boolean
}

export class PaginationQueryParams {
    @IsInt()
    @IsOptional()
    @Min(1)
    page?: number

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    pageSize?: number

    @IsString()
    @IsOptional()
    sortBy?: string

    @IsString()
    @IsOptional()
    sortOrder?: 'asc' | 'desc'
}
