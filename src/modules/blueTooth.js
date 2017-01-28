import {NativeAppEventEmitter} from 'react-native';
import BleManager from 'react-native-ble-manager';

// Action creator
const blueToothScanStart = () => ({
  type: "BLUE_TOOTH_SCAN_START",
});

const blueToothScanStop = () => ({
  type: "BLUE_TOOTH_SCAN_STOP",
});

const blueToothListUpdate = (list) => ({
  type: "BLUE_TOOTH_LIST_UPDATE",
  payload: list,
});

export const handleScanStart = () => {
  return (dispatch) => {
    dispatch(blueToothScanStart());
    BleManager.scan([], 9999, true)
        .then(() => {
          console.log('Scanning start');
        })
        .catch(err => {
          console.error(err);
        });
  };
};

export const handleScanStop = () => {
  return (dispatch) => {
    dispatch(blueToothScanStop());
    BleManager.stopScan()
        .catch(err => {
          console.error(err);
        });
  }
};


export const init = () => {
  return (dispatch) => {
    console.log("start init");
    // console.warn("BleManager.start", BleManager.start);
    BleManager.start({showAlert: false})
        .catch(err => {
          console.log("err: ", err);
        });
    NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral',
        (data) => dispatch(handleDiscoverPeripheral(data)));
  }
};

export const handleDiscoverPeripheral = (data) => {
  // console.warn("handleDiscoverPeripheral called");
  // console.log("data", data);
  return (dispatch, getState) => {
    // console.log('Got ble data', data);
    const devices = getState().blueTooth.list;
    
    console.log("devices", devices);
    
    let newDeviceArray = new Array(...devices);
    let newDeviceExist = false;
    newDeviceArray.forEach(device => {
      if (device.id === data.id) newDeviceExist = true
    });
    if (!newDeviceExist) {
      newDeviceArray.push(data);
      dispatch(blueToothListUpdate(newDeviceArray));
      // this.setState({ble: data, devices: });
      // console.log('发现的蓝牙设备: ' + JSON.stringify(data));
    } else {
      console.log("发现的设备重复了");
    }
  }
};

// reducer
const blueTooth = {
  scanning: false,
  list: [],
};

const reducer = (state = blueTooth, action) => {
  switch (action.type) {
    case "BLUE_TOOTH_SCAN_START":
      return {scanning: true, list: []};
    case "BLUE_TOOTH_SCAN_STOP":
      return {...state, scanning: false};
    case "BLUE_TOOTH_LIST_UPDATE":
      return {...state, list: action.payload};
    default:
      return state;
  }
};

export default reducer;
