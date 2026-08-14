import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './global/exception/global-exception-filter';
import { ResponseInterceptor } from './global/intercepter/response-intercepter';


export async function createApiApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  app.useGlobalFilters(app.get(GlobalExceptionFilter));
  app.useGlobalInterceptors(app.get(ResponseInterceptor));
  app.enableShutdownHooks();

  return app;
}

async function bootstrap() {
  const app = await createApiApplication();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
