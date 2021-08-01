import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { AppColor } from '../utils/helper';

const PageSearch = props => {
    return(
        <View style={styles.container}>
            <View style={styles.modalTransparent}>
            </View>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.cancel} onPress={() => props.close()}>
                    <FontAwesome name="close" size={15} color={AppColor.gray}/>
                </TouchableOpacity>
                <View style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search this page.. (hit enter to search)"
                            placeholderTextColor={AppColor.gray}
                            autoCapitalize="none"
                            value={props.searchValue}
                            onChangeText={val => props.updateSearch(val)}
                            autoFocus={true}
                            returnKeyLabel='search'
                            returnKeyType="search"
                            keyboardType="default"
                            onSubmitEditing={() => props.startSearch()}
                        />
                    </View>
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
      },
      cancel:{
          height:25,
          width:25,
          borderRadius:50,
          borderWidth:1,
          borderColor:AppColor.gray,
          alignSelf:'flex-end',
          justifyContent:'center',
          alignItems:'center',
          marginVertical:10
      },
      inputArea:{
        //marginTop:20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor:AppColor.gray,
        padding:3,
        paddingBottom:0,
        width:'100%'
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: AppColor.gray,
    },
     
})
export default PageSearch