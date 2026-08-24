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
import { User } from './domain/user';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RedisModule],
    controllers: [UserController],
    providers: [LocalSignupService, LocalLoginService, ReissueService, BcryptPasswordEncoder, RefreshTokenRepository, UserRepository]
})
export class UserModule {}
