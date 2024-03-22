import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { GqlAuthGuard } from './app/GraphQL/gql-authGuard';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new GqlAuthGuard(reflector));
  //
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5200;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
