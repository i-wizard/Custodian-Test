import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,

} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {AppColor} from '../utils/helper';

const CircleButton = ({style, openSearch}) => {
  return (
    <TouchableOpacity onPress={() => openSearch()} style={{...styles.body, ...style}}>
      <Feather name="search" size={25} color="#fff" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  body: {
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    backgroundColor: AppColor.primary,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 15,
  },
});
export default CircleButton;
