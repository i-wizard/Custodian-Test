import React from 'react';
import {
  StyleSheet,

} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {AppColor, MyButton} from '../utils/helper';

const SearchOptions = props => {
    return(
        <Animatable.View animation="fadeInRightBig" style={[styles.container, props.style]}>
            <MyButton value="Flight Search" body={styles.flightBtn} action={() => props.openFlightSearch()}/>
            <MyButton value="Page Search" body={{...styles.flightBtn, backgroundColor:AppColor.orange}} action={() => props.openPageSearch()}/>
        </Animatable.View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        width:"50%",
        alignSelf:"flex-end",
        justifyContent:"space-between"
    },
    flightBtn:{
        backgroundColor:AppColor.green,
        minWidth:'45%'
    }
})
export default SearchOptions