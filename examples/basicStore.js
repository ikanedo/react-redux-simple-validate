import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { FormReducer } from 'react-redux-simple-validate';

const Forms = FormReducer;
const basicFormReducer = combineReducers({
  Forms
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export default createStore(
  basicFormReducer,
  composeEnhancer(
    applyMiddleware()
  )
);
