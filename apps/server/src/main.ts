import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { GqlAuthGuard } from './app/GraphQL/gql-authGuard';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new GqlAuthGuard(reflector));
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', // Update this with the origin of your frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5200;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
