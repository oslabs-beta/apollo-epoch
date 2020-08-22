/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import regeneratorRuntime from "regenerator-runtime";
import App from './containers/App';
import configureStore from './store/configuration/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
