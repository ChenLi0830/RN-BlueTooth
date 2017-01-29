import {combineReducers} from 'redux';
import wifiReducer from './wifi';
import blueToothReducer from './blueTooth';
import tabReducer from './tab';

export default combineReducers({
  wifi: wifiReducer,
  blueTooth: blueToothReducer,
  tab: tabReducer,
});
