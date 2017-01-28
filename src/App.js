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
import {blueToothActions} from './modules';
window.navigator.userAgent = 'ReactNative';

// Need to require instead of import so we can set the user agent first
// This must be below your `window.navigator` hack above
import io from 'socket.io-client';

export default class App extends Component {
  constructor(props){
    super(props);
    const ws = new WebSocket('ws://192.168.0.24:8080');
  
    // ws.onopen = () => {
    //   // connection opened
    //
    //   ws.send('something'); // send a message
    // };
  
    ws.onmessage = (e) => {
      // a message was received
      // console.warn(e.data);
      if (e.data === '/bt/start'){
        store.dispatch(blueToothActions.handleScanStart());
      } else if (e.data === '/bt/stop'){
        store.dispatch(blueToothActions.handleScanStop());
      }
    };
  
    /*    const socket = io('http://sample-env.z8dyr5fr92.us-west-2.elasticbeanstalk.com:8080/', {//这里把ip从localhost改为wifi内网ip，是为了让手机端能访问到
        // const socket = io('http://192.168.0.24:3000/', {//这里把ip从localhost改为wifi内网ip，是为了让手机端能访问到
          transports: ['websocket'] // you need to explicitly tell it to use websockets
        });
      
        socket.on('connect', () => {
          console.log('socket io connected!');
      
          socket.on('/bt/start', () => {
            console.warn("/bt/start");
            // store.dispatch(blueToothActions.handleScanStart());
            
            // socket.emit('my other event', { my: 'data' });
          });
          
          socket.on('/bt/stop', () => {
            console.warn("/bt/stop");
            store.dispatch(blueToothActions.handleScanStop());
            // socket.emit('my other event', { my: 'data' });
          });
          //
          // socket.on('/wifi/start', () => {
          //   console.log("/wifi/start");
          //   // socket.emit('my other event', { my: 'data' });
          // });
          //
          // socket.on('/wifi/stop', () => {
          //   console.log("/wifi/stop");
          //   // socket.emit('my other event', { my: 'data' });
          // });
          
          socket.on('disconnect', function(){
            console.log('user disconnected');
          });
        });*/
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
