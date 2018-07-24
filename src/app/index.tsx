import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/configureStore';

import App from './components/App';
import SearchPage from './components/SearchPage/SearchPage';

declare let module: any;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
