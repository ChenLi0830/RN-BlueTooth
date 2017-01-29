// Action creator
export const wifiScanStart = () => ({
  type: "WIFI_SCAN_START",
});

export const wifiScanStop = () => ({
  type: "WIFI_SCAN_STOP",
});

export const wifiListUpdate = (list) => ({
  type: "WIFI_LIST_UPDATE",
  payload: list,
});

// reducer
const wifi = {
  scanning: false,
  list: [],
};

const reducer = (state = wifi, action) => {
  switch (action.type) {
    case "WIFI_SCAN_START": return {...state, scanning: true};
    case "WIFI_SCAN_STOP": return {...state, scanning: false};
    case "WIFI_LIST_UPDATE": return {...state, list: action.payload};
    default: return state;
  }
};

export default reducer;
