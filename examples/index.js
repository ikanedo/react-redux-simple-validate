import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './basicStore';
import BasicForm from './basicForm';

ReactDOM.render(
  <Provider store={store}>
    <BasicForm name="Basic" />
  </Provider>,
  document.getElementById('basicForm') // eslint-disable-line
);
