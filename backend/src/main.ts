import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  console.log('start port ', process.env.APP_PORT)
  await app.listen(process.env.APP_PORT || 8000); // setting in google api is :8000
}
bootstrap();
