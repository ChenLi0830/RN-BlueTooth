import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import * as blueToothActions from './blueTooth';
import * as wifiActions from './wifi';
import * as tabActions from './tab';
export {blueToothActions, wifiActions, tabActions};

const DEBUG = true;
const logger = createLogger();

const middleware = [
  thunk,
  DEBUG && logger,
].filter(Boolean);

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;