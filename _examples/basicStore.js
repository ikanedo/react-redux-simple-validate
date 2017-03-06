import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import Forms from 'src/forms/formReducer';

// see this video (goo.gl/8av6m4) to understand why we combine reducers
// TL;DW - allows us to create a per domain reducer
const basicFormReducer = combineReducers({
  Forms
});

// See diagram for the uni directional redux flow
// http://staltz.com/img/redux-unidir-ui-arch.jpg
export const store = createStore(
  basicFormReducer,
  compose(
    // Handles async actions
    applyMiddleware(thunk)
  )
);
