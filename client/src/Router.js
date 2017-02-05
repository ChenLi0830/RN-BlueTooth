import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';
import Ble from './components/Ble';
import Wifi from './components/Wifi';
import FacebookSMSLogin from './components/FacebookSMSLogin';
import Auth0Login from './components/Auth0Login';
import {connect} from 'react-redux';
import {blueToothActions, wifiActions, tabActions} from './modules';


class TabIcon extends React.Component {
  render(){
    return (
        <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
  }
}

const RouterComponent = ({bleInit, BLEHandleScanStart, BLEHandleScanStop, wifiHandleScanStart, wifiHandleScanStop, changeTab}) => {
  bleInit();
  //sceneStyle={{paddingTop: 65}}
  return <Router sceneStyle={{paddingTop: 0}}>
    <Scene key="auth0Login" component={Auth0Login} initial hideNavBar/>
    <Scene key="facebookSMSLogin" component={FacebookSMSLogin} />
    <Scene key="myTabBar" tabs={true} hideNavBar tabBarStyle={style.tabBarStyle}>
      <Scene key="myTab1" title="蓝牙"
             component={Ble} icon={TabIcon}
             leftTitle = "开始扫描"
             onLeft = {() => BLEHandleScanStart()}
             rightTitle = "停止扫描"
             onRight = {() => BLEHandleScanStop()}
             onPress={() => {
               changeTab(0);
               Actions.myTab1();
             }}
      />
      
      <Scene key="myTab2" title="WIFI"
             component={Wifi} icon={TabIcon}
             leftTitle = "开始扫描"
             onLeft = {() => wifiHandleScanStart()}
             rightTitle = "停止扫描"
             onRight = {() => wifiHandleScanStop()}
             onPress={() => {
               changeTab(1);
               Actions.myTab2();
             }}
      />
    </Scene>

  </Router>
};

let style = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: 'white',
    opacity        : 1
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    bleInit: () => dispatch(blueToothActions.init()),
    BLEHandleScanStart: () => dispatch(blueToothActions.handleScanStart()),
    BLEHandleScanStop: () => dispatch(blueToothActions.handleScanStop()),
    wifiHandleScanStart: () => dispatch(wifiActions.wifiScanStart()),
    wifiHandleScanStop: () => dispatch(wifiActions.wifiScanStop()),
    changeTab: (tab) => dispatch(tabActions.changeTab(tab))
  }
};

export default connect(null, mapDispatchToProps)(RouterComponent);


