import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppColor } from '../utils/helper';


const Booking = props => {
    return(
        <View style={styles.container}>
            <View style={styles.modalTransparent}>
            </View>
            <View style={styles.modalContent}>
                <Text>SearchFlight</Text>
                <FontAwesome onPress={props.close()} name="close" size={20} color={AppColor.primary}/>
            </View>
            <View style={styles.modalTransparent}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000000aa',
        justifyContent:'flex-end'
    },

      modalContent:{
          backgroundColor:'#fff',
          flex:2,
          padding:10,
          borderRadius:10,
          marginHorizontal:30
  
      },
      modalTransparent:{
        flex:2
      },
      footer:{
        flex:2
      }
})
export default Booking