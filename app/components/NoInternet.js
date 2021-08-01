import React from 'react';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { MyStatusBar, AppColor } from '../utils/helper';

const NoInternet = props => {
    return(
        <SafeAreaView style={styles.noNetwork}>
        {Platform.OS == 'ios' && (
          <MyStatusBar
            backgroundColor={AppColor.primary}
            barStyle="light-content"
          />
        )}
        <MaterialIcons name="wifi-off" size={40} color={AppColor.primary} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Connection Error</Text>
        <Text style={styles.text}>Internet connection could not be detected.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => props.checkNetworkConnection(true)}>
          <Text style={{color: '#fff'}}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    noNetwork: {
        backgroundColor:"#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text:{
          marginVertical:6
      },
      btn:{
        backgroundColor:AppColor.primary,
        padding:5,
        width:'30%',
        alignItems:"center",
        borderRadius:3,
      }
})
export default NoInternet