import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  createHttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = createHttpLink({
  uri: 'http://localhost:5200/graphql',
  // credentials:'include'
});

const link = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
}, httpLink);

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
