import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AppColor, MyButton} from '../utils/helper';

const FlightList = props => {
  const ClosedCard = () => {
    return (
      <View  style={[styles.card]}>
        <View style={styles.firstLayer}>
          <Text style={styles.text}>Tokyo Airport</Text>
          <Text style={{...styles.text, fontWeight: 'bold'}}>
            British Airways
          </Text>
        </View>
        <View style={styles.tripContainer}>
          <Text>Tok</Text>
          <View style={styles.planeContainer}>
            <View style={styles.horizontalLine}></View>
            <Ionicons
              name="airplane"
              size={17}
              style={styles.plane}
              color={AppColor.green}
            />
            <View style={styles.horizontalLine}></View>
          </View>
          <Text>NGR</Text>
        </View>
        <View style={[styles.flexContainer, styles.mb]}>
          <Text style={styles.time}>08:45AM</Text>
          <View style={[styles.flexContainer]}>
            <MaterialIcons name="timer" size={13} color={AppColor.gray} />
            <Text style={{fontSize: 11}}>8hours</Text>
          </View>
          <Text style={styles.time}>04:45pm</Text>
        </View>
        <View style={[styles.flexContainer, styles.mb]}>
          <Text style={styles.flightClass}>Business Class</Text>
          <Text style={styles.layoverText}>Non Stop</Text>
          <Text style={styles.seatLeft}>16 Seats Left</Text>
        </View>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          iterationDelay={500}
          style={styles.btnContainer}>
          <MyButton value="Book" />
        </Animatable.View>
      </View>
    );
  };
  return (
    <Animatable.View animation="fadeInUpBig" style={[styles.container]}>
      <ClosedCard />
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    backgroundColor: '#fff',
    shadowRadius: 6,
    elevation: 10,
    padding: 10,
    borderRadius: 10,
  },
  firstLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: AppColor.gray,
  },
  tripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  planeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalLine: {
    width: 60,
    height: 1,
    opacity: Platform.OS == 'ios' ? 0.1 : 0.2,
    backgroundColor: AppColor.gray,
  },
  plane: {
    transform: [{rotateY: '360deg'}],
    marginHorizontal: 5,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mb: {
    marginBottom: 5,
  },
  time: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  flightClass: {
    color: AppColor.green,
    backgroundColor: AppColor.lightGreen,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    fontSize: 13,
  },
  seatLeft: {
    color: AppColor.orange,
    fontSize: 11,
    fontWeight: 'bold',
  },
  layoverText: {
    fontSize: 10,
  },
  btnContainer: {
    width: '30%',
    alignSelf: 'center',
  },
});
export default FlightList;
