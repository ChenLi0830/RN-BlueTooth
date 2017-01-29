/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import Header from './components/header';
import { Provider } from 'react-redux';
import store from './modules';
import Router from './Router';
import {blueToothActions, wifiActions} from './modules';
window.navigator.userAgent = 'ReactNative';

// Need to require instead of import so we can set the user agent first
// This must be below your `window.navigator` hack above
import io from 'socket.io-client';

export default class App extends Component {
  constructor(props){
    super(props);
    // const socket = io('http://localhost:3000');
    const serverUri = __DEV__
        ? "http://192.168.0.24:3000/" //这里把ip从localhost改为wifi内网ip，是为了让手机端能访问到
        : "http://sample-env.z8dyr5fr92.us-west-2.elasticbeanstalk.com:8080/";
    
    const socket = io(serverUri, {
      transports: ['websocket'] // you need to explicitly tell it to use websockets
    });
  
    socket.on('connect', () => {
      console.log('socket io connected!');
  
      socket.on('/bt/start', () => {
        console.log("/bt/start");
        if (store.getState().tab.tab === 0) {// Check if it is on the blue tooth page
          store.dispatch(blueToothActions.handleScanStart());
        }
      });
      
      socket.on('/bt/stop', () => {
        console.log("/bt/stop");
        if (store.getState().tab.tab === 0) {
          store.dispatch(blueToothActions.handleScanStop());
          
          const list = store.getState().blueTooth.list;
          console.log("list.length", list.length);
          if (list.length>0){
            console.warn("emit bleList");
            socket.emit('bleList', list);
          }
        }
      });
  
      socket.on('/wifi/start', () => {
        console.log("/wifi/start");
        if (store.getState().tab.tab === 1) {// Check if it is on the wifi page
          store.dispatch(wifiActions.wifiScanStart());
        }
      });
  
      socket.on('/wifi/stop', () => {
        console.log("/wifi/stop");
        if (store.getState().tab.tab === 1) {
          store.dispatch(wifiActions.wifiScanStop());
  
          const list = store.getState().wifi.list;
          console.log("list", list);
          if (list.length>0){
            console.warn("emit wifiList");
            socket.emit('wifiList', list);
          }
        }
      });
      
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });
  }
  
  render() {
    return (
        <Provider store={store}>
          <Router/>
          {/*<View style={styles.container}>*/}
            {/*<Header headerText="React Native蓝牙扫描测试"/>*/}
            {/*<BleExample/>*/}
          {/*</View>*/}
        </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  
});
