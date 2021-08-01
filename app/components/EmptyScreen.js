import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColor } from '../utils/helper';

const EmptyScreen = () => {
    return(
        <View style={styles.container}>
            <Ionicons name="sad-outline" size={100} color={AppColor.gray}/>
            <Text style={styles.text}>This Screen is Empty.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
   
        flex:1
    },
    text:{
        fontSize:30,
        color:AppColor.gray
    }
})
export default EmptyScreen