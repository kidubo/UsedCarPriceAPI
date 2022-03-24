import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['abcdefgh'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This help to validate the data so that user can not pass data that are not in DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
