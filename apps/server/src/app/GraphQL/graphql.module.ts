import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/api.gql'),
      sortSchema: true,
      playground: true,
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
  ],
  providers: [],
  exports: [GraphQLModule],
})
export class GraphQlModule {}