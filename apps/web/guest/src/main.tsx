import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
