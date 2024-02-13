import { combineReducers, createStore } from 'redux';

import IState from './states/userState';
import appReducer from './reducers/userReducers';

const reducers = combineReducers<IState>({
  app: appReducer,
});

const store = createStore(reducers);

export default store;