import React from 'react';
import {ScrollView, View, PermissionsAndroid} from 'react-native';
// import BleManager from 'react-native-ble-manager';
import {List, Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {blueToothActions} from '../modules';

const Item = List.Item;
const Brief = Item.Brief;

const Ble = (props) => {
  
  // const handleToggle = () => {
  //   if (props.scanning){
  //     props.blueToothScanStop();
  //   } else {
  //     setTimeout(() => {
  //       props.handleScanStart();
  //     }, 300);
  //   }
  // };
  const scanning = props.scanning;
  
  if (!scanning) {
    Toast.hide();
  } else {
    Toast.loading('扫描中...', 0, () => {
      console.log('加载完成!!!');
    });
  }
  
  const {app, button} = styles;
  
  const bleList = props.list.map(device => {
    return <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                 key={device.id}>
      {device.name ? device.name : device.id}
    </Item>
  });
  
  return (
      <View style={app}>
        {/*<Button style={button} type="primary"*/}
        {/*onClick={() => handleToggle() }>*/}
        {/*{"蓝牙扫描"}*/}
        {/*</Button>*/}
        
        <ScrollView>
          <List renderHeader={() => "扫描结果"}>
            <Item
                thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">{`周围共有${props.list.length}个蓝牙设备`}</Item>
            {bleList}
          </List>
        </ScrollView>
      </View>
  );
};

const styles = {
  app: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    // height: 500,
    // width: 500
    marginVertical: 65
  },
  button: {
    margin: 10
  }
};

const mapStateToProps = (state) => ({
  list: state.blueTooth.list,
  scanning: state.blueTooth.scanning,
});

const mapDispatchToProps = (dispatch) => {
  // const handleDiscoverPeripheral = () => {};
  return {
    // handleScanStart: () => dispatch(blueToothActions.handleScanStart()),
    // handleScanStop: () => dispatch(blueToothActions.handleScanStop()),
    // init: () => dispatch(blueToothActions.init()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Ble);