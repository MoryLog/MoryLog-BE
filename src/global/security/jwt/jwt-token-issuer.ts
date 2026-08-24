import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IssuedTokenPair, JWT_ALGORITHM, JWT_TOKEN_TYPE, JwtPayload, JwtTokenType } from "./type/jwt.types";
import { createHash, randomUUID } from "crypto";
import { env } from "src/global/config/env";
import { InvalidTokenException } from "./exception/invalid-token.exception";
import { type RefreshTokenStore } from "./port/refresh-token-store";
import { RefreshToken } from "src/domain/user/infrastructure/security/refresh-token/refresh-token";

@Injectable()
export class JwtTokenIssuer{
    constructor(
        private readonly jwtService: JwtService,
        private readonly refreshTokenStore: RefreshTokenStore
    ){}

    async createTokenPair(userId: string): Promise<IssuedTokenPair>{
        const [accessToken, refreshToken] = await Promise.all([
            this.issueToken(userId, JWT_TOKEN_TYPE.ACCESS, Number(env.jwt.JWT_ACCESS_EXPIRATION)),
            this.issueToken(userId, JWT_TOKEN_TYPE.REFRESH, Number(env.jwt.JWT_REFRESH_EXPIRATION))
        ]);

        await this.refreshTokenStore.save(RefreshToken.create({
            userId: userId,
            refreshToken: this.digest(refreshToken),
            ttlSeconds: Number(env.jwt.JWT_REFRESH_EXPIRATION)
        }));
        
        return this.createResult(accessToken, refreshToken);
    }

    async rotateTokenPair(userId: string, currentRefreshToken: string): Promise<IssuedTokenPair>{
        const [accessToken, nextRefreshToken] = await Promise.all([
            this.issueToken(userId, JWT_TOKEN_TYPE.ACCESS, Number(env.jwt.JWT_ACCESS_EXPIRATION)),
            this.issueToken(userId, JWT_TOKEN_TYPE.REFRESH, Number(env.jwt.JWT_REFRESH_EXPIRATION))
        ]);

        const newRefreshToken = RefreshToken.create({
            userId,
            refreshToken: nextRefreshToken,
            ttlSeconds: Number(
            env.jwt.JWT_REFRESH_EXPIRATION,
            ),
        });

        const rotated = await this.refreshTokenStore.rotate(
            userId,
            currentRefreshToken,
            newRefreshToken,
        );

        if(!rotated){
            throw new InvalidTokenException()
        }

        return this.createResult(accessToken, nextRefreshToken);
    }

    async verifyRefreshToken(refreshToken: string): Promise<JwtPayload>{
        try{
            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                refreshToken,
                {
                    secret: env.jwt.JWT_SECRET_KEY,
                    algorithms: [JWT_ALGORITHM]
                }
            );

            if(payload.typ !== JWT_TOKEN_TYPE.REFRESH){
                throw new InvalidTokenException();
            }

            return payload
        } catch{
            throw new InvalidTokenException();
        }
    }

    private issueToken(userId: string, type: JwtTokenType, expiration: number): Promise<string>{
        return this.jwtService.signAsync(
            {
                sub: userId,
                typ: type,
                jti: randomUUID()
            },
            {
                secret: env.jwt.JWT_SECRET_KEY,
                algorithm: JWT_ALGORITHM,
                expiresIn: expiration
            }
        )
    }

    private digest(
        token: string
    ): string{
        return createHash("SHA256")
            .update(token)
            .digest("base64")
    }

    private createResult(accessToken: string, refreshToken: string): IssuedTokenPair{
        return {
            accessToken,
            refreshToken,
            refreshTokenTtlSeconds: Number(env.jwt.JWT_REFRESH_EXPIRATION)
        }
    }
}