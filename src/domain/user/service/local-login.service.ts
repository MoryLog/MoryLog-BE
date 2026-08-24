import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/repository/user.repository";
import { BcryptPasswordEncoder } from "../infrastructure/security/password/bcrypt-password-encoder";
import { LoginUserRequest } from "./dto/request/login.request";
import { TokenResponse } from "./dto/response/token.response";
import { UserNotFoundException } from "./exception/user-not-found.exception";
import { InvalidPasswordException } from "./exception/invalid_password.exception";
import { JwtTokenIssuer } from "src/global/security/jwt/jwt-token-issuer";


@Injectable()
export class LocalLoginService{
    constructor(
        private readonly repository: UserRepository,
        private readonly passwordEncoder: BcryptPasswordEncoder,
        private readonly jwtTokenIssuer: JwtTokenIssuer
    ){}

    async login(request: LoginUserRequest): Promise<TokenResponse>{
        const user = await this.repository.findByEmail(request.email);
        if(user == null) throw new UserNotFoundException();

        if(!await this.passwordEncoder.matches(request.password, user.passwordHash)){
            throw new InvalidPasswordException();
        }

        const tokenPair = await this.jwtTokenIssuer.createTokenPair(user.userId)

        return {
            "accessToken": tokenPair.accessToken,
            "refreshToken": tokenPair.refreshToken
        }
    }
}