import React from 'react';
import {SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity} from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export const AppColor = {
  primary:"#0030A0",
  green:"#519A63",
  gray:"gray",
  lightGreen:"#EAF5EB",
  orange:'#FB7C06',
}
export const MyStatusBar = ({...props}) => (
  <View style={[styles.statusBar, {backgroundColor:AppColor.primary}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={AppColor.primary} {...props} />
    </SafeAreaView>
  </View>
);

export const MyButton = props => {
  return(
      <TouchableOpacity style={{...styles.body, ...props.body}}>
          <Text style={{...styles.text, ...props.text}}>{props.value}</Text>
      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  body:{
    padding:5,
    borderRadius:7,
    backgroundColor:AppColor.primary,
    justifyContent:'center',
    alignItems:'center'
},
text:{
    color:'#fff',
    fontSize:13
}
});
