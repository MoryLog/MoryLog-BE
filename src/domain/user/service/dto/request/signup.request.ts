import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class SignupUserRequest{
    @IsEmail()
    email!: string

    @IsString()
    @Length(1, 30)
    blogName!: string

    @IsString()
    password!: string
}