import React from 'react';
import {AppRegistry} from 'react-native';
import App from './client/src/App';
import Auth0Login from './client/src/components/Auth0Login';

AppRegistry.registerComponent('RN_Wifi_BT', () => Auth0Login);

// import React, { Component } from 'react';
// import { AppRegistry } from 'react-native';
// import { Button } from 'antd-mobile';
//
// class HelloWorldApp extends Component {
//   render() {
//     return <Button>Start</Button>;
//   }
// }
//
// AppRegistry.registerComponent('RN_Wifi_BT', () => HelloWorldApp);