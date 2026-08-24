import { Injectable } from "@nestjs/common";
import { TokenResponse } from "./dto/response/token.response";
import { TokenRequest } from "./dto/request/token.request";
import { JwtTokenIssuer } from "src/global/security/jwt/jwt-token-issuer";


@Injectable()
export class ReissueService{
    constructor(
        private readonly jwtTokenIssuer: JwtTokenIssuer,
    ){}

    async reissue(request: TokenRequest): Promise<TokenResponse>{
        const payload = await this.jwtTokenIssuer.verifyRefreshToken(request.refreshToken);

        const tokenPair = await this.jwtTokenIssuer.rotateTokenPair(payload.sub, request.refreshToken);

        return {
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken
        }
    }
}