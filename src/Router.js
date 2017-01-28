import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Main from './components/Ble';
import {connect} from 'react-redux';
import {blueToothActions} from './modules';

const RouterComponent = ({bleInit, handleScanStart, handleScanStop}) => {
  bleInit();
  
  return <Router sceneStyle={{paddingTop: 65}}>
    <Scene key="main" initial
           component = {Main}
           leftTitle = "开始"
           onLeft = {() => handleScanStart()}
           rightTitle = "停止"
           onRight = {() => handleScanStop()}
    />
  </Router>
};

const mapDispatchToProps = (dispatch) => {
  return {
    bleInit: () => dispatch(blueToothActions.init()),
    handleScanStart: () => dispatch(blueToothActions.handleScanStart()),
    handleScanStop: () => dispatch(blueToothActions.handleScanStop()),
  }
};

export default connect(null, mapDispatchToProps)(RouterComponent);


