import React from 'react';
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo';

import Test from './container/test/TestContainer';
import configureStore from './redux/store/store';
import configureClient from './graphql/client/configureClient';

const client = configureClient();
const store = configureStore();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Test  />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
