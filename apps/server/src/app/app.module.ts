import { Module } from '@nestjs/common';
// import { CorsModule } from '@nestjs/cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LanguageModule } from './language/language.module';
import { StepsModule } from './Steps/steps.module';
import { GraphQlModule } from './GraphQL/graphql.module';
import { usersModule } from './Users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    GraphQlModule,
    LanguageModule,
    StepsModule,
    usersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
