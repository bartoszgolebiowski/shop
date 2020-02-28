import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import configureStore from "./redux/store/store";
import configureClient from "./graphql/client/configureClient";
import Router from "./container/Router/Router";

const client = configureClient();
const store = configureStore();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <Router />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
