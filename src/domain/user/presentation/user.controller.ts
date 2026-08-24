import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile } from "@nestjs/common";
import { LocalSignupService } from "../service/local-signup.service";
import { SignupUserRequest } from "../service/dto/request/signup.request";
import { ProfileImageValidationPipe } from "src/global/pipe/profile-image-validation.pipe";
import { LoginUserRequest } from "../service/dto/request/login.request";
import { LocalLoginService } from "../service/local-login.service";
import { TokenResponse } from "../service/dto/response/token.response";
import { ReissueService } from "../service/reissue.service";
import { TokenRequest } from "../service/dto/request/token.request";

@Controller('users')
export class UserController{
    constructor(
        private readonly localSignupService: LocalSignupService,
        private readonly localLoginService: LocalLoginService,
        private readonly reissueService: ReissueService
    ){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(
        @Body() 
        request: SignupUserRequest,

        @UploadedFile(ProfileImageValidationPipe)
        profileImage: Express.Multer.File
    ){
        this.localSignupService.signup(request, profileImage);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body()
        request: LoginUserRequest
    ): Promise<TokenResponse> {
        return this.localLoginService.login(request);
    }

    @Post('reissue')
    @HttpCode(HttpStatus.CREATED)
    async reissue(
        @Body()
        request: TokenRequest
    ): Promise<TokenResponse> {
        return this.reissueService.reissue(request);
    }
}