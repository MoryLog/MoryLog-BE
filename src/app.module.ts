import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalExceptionFilter } from './global/exception/global-exception-filter';
import { ResponseInterceptor } from './global/intercepter/response-intercepter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GlobalExceptionFilter, ResponseInterceptor],
})
export class AppModule {}
