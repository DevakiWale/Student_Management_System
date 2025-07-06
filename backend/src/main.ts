import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser'; // ✅ Import cookie-parser

//dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // ✅ Enable cookie parsing middleware

  app.enableCors({
    origin: 'http://localhost:3001', // ✅ Frontend origin
    credentials: true,              // ✅ Allow sending cookies
  });

  await app.listen(3000);
}
bootstrap();
