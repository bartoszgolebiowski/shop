import React from 'react';
import { Provider } from 'react-redux'

import Home from './container/home/Home';
import configureStore from './redux/store/store'

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
