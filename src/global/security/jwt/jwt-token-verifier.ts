import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_ALGORITHM, JWT_TOKEN_TYPE, JwtPayload, JwtTokenType } from "./type/jwt.types";
import { env } from "src/global/config/env";
import { InvalidTokenException } from "./exception/invalid-token.exception";
import { ExpiredTokenException } from "./exception/expired-token.exception";

@Injectable()
export class JwtTokenVerifier{
    constructor(
        private readonly jwtService: JwtService
    ){}

    verifyAccessToken(token: string): Promise<JwtPayload>{
        return this.verifyToken(token, JWT_TOKEN_TYPE.ACCESS);
    }

    private async verifyToken(token: string, expectedType: JwtTokenType): Promise<JwtPayload>{
        try{
            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                token,
                {
                    secret: env.jwt.JWT_SECRET_KEY,
                    algorithms: [JWT_ALGORITHM]
                }
            )

            if(payload.typ !== expectedType) throw new InvalidTokenException();

            return payload;
        } catch(error){
            if(error instanceof InvalidTokenException) throw error;

            if(error instanceof Error && error.name === 'TokenExpiredError') throw new ExpiredTokenException();

            throw new InvalidTokenException()
        }
    }
}