import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LanguageModule } from './language/language.module';
import { GraphqlModule } from './GraphQL/graphql.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [GraphqlModule,LanguageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
