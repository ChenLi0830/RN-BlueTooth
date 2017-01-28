// Action creator
import {blueToothScanStop} from './blueTooth'
import {wifiScanStop} from './wifi'

export const changeTab = (tab) => {
  return (dispatch) => {
    dispatch(blueToothScanStop());
    dispatch(wifiScanStop());
    // return {
    //   type: "CHANGE_TAB",
    //   payload: tab,
    // }
    dispatch({
      type: "CHANGE_TAB",
      payload: tab,
    });
  }
};

// reducer
const tab = {
  tab: 1, // or 2
};

const reducer = (state = tab, action) => {
  switch (action.type){
    case "CHANGE_TAB": return {...state, tab: action.payload};
    default: return state;
  }
};

export default reducer;