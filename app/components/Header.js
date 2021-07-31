import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import { AppColor } from '../utils/helper';

const Header = props => {

  const tabOptions = ['Explore', 'Flights', 'Hotels', 'Places', 'Others'];
  const optionsElement = [];
  for (let i = 0; i < tabOptions.length; i++) {
    optionsElement.push(
      <TouchableOpacity
        key={tabOptions[i].toString()}
        style={{
          ...styles.tabOptions,
          borderBottomWidth: props.selectedTab == tabOptions[i] ? 3 : 0,
        }}
        onPress={() => props.changeSelectedTab(tabOptions[i])}>
        <Text style={styles.optionText}>{tabOptions[i]}</Text>
      </TouchableOpacity>,
    );
  }
  return (
    <View style={[styles.container, {height: props.headerHeight}]}>
      <View style={styles.topLayer}>
        <View style={styles.location}>
          <MaterialIcons name="location-pin" size={17} color={AppColor.orange} />
          <Text style={styles.text}>Sydney</Text>
        </View>
        <View>
          <Image
            source={require('../images/profile.jpeg')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.tabOptionsContainer}>{optionsElement}</View>
   
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.primary,
    paddingHorizontal: 10,
    paddingTop: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginLeft: 3,
    fontSize: 16,
  },
  image: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  tabOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginHorizontal: 5,
    //marginTop:100
  },
  tabOptions: {
    borderBottomWidth: 2,
    borderBottomColor: AppColor.green,
    paddingBottom: 3,
    paddingHorizontal: 4,
  },
  optionText: {
    color: '#fff',
  },
  headerSearch: {
    marginTop: 15,
    //backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default Header;
