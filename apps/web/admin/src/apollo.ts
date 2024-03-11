import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:5200/graphql',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5200/graphql`,
  options: {
    reconnect: false,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

 export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
