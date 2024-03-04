import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5200;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
