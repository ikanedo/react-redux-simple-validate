import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { FormReducer } from 'react-redux-simple-validate';

const Forms = FormReducer;
const basicFormReducer = combineReducers({
  Forms
});

export const store = createStore(
  basicFormReducer,
  compose(
    applyMiddleware()
  )
);
