import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './../reducers';

const store = createStore(
    rootReducer, // reducer
    {}, // initial state
    applyMiddleware(thunk) // middleware
  );

export {store};