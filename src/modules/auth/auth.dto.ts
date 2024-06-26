import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator'

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 50)
    password!: string
}
