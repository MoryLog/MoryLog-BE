import { IsString } from "class-validator";

export class TokenRequest{
    @IsString()
    refreshToken!: string
}