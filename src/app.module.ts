import { Module } from '@nestjs/common';
import { GlobalExceptionFilter } from './global/exception/global-exception-filter';
import { ResponseInterceptor } from './global/intercepter/response-intercepter';
import { UserModule } from './domain/user/user.module';
import { RedisModule } from './global/module/redis.module';
import { DatabaseModule } from './global/module/database.module';

@Module({
  imports: [DatabaseModule, UserModule, RedisModule],
  controllers: [],
  providers: [GlobalExceptionFilter, ResponseInterceptor],
})
export class AppModule {}
