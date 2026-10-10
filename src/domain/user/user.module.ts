import { Module } from '@nestjs/common';
import { RedisModule } from 'src/global/module/redis.module';
import { UserController } from './presentation/user.controller';
import { LocalSignupService } from './service/local-signup.service';
import { LocalLoginService } from './service/local-login.service';
import { ReissueService } from './service/reissue.service';
import { BcryptPasswordEncoder } from './infrastructure/security/password/bcrypt-password-encoder';
import { RefreshTokenRepository } from './infrastructure/security/refresh-token/repository/refresh-token.repository';
import { UserRepository } from './domain/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './domain/user';
import { S3ImageStorageService } from 'src/global/storage/s3-image-storage.service';
import { JwtTokenIssuer } from 'src/global/security/jwt/jwt-token-issuer';
import { REFRESH_TOKEN_STORE } from 'src/global/security/jwt/port/refresh-token-store';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RedisModule, JwtModule.register({})],
    controllers: [UserController],
    providers: [
        LocalSignupService,
        LocalLoginService,
        ReissueService,
        BcryptPasswordEncoder,
        RefreshTokenRepository,
        { provide: REFRESH_TOKEN_STORE, useExisting: RefreshTokenRepository },
        UserRepository,
        S3ImageStorageService,
        JwtTokenIssuer,
    ]
})
export class UserModule {}
