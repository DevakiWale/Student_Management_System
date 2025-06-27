import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS here
  app.enableCors({
    origin: 'http://localhost:3001', // frontend origin
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
