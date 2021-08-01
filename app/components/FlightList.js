import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {AppColor, MyButton} from '../utils/helper';

const FlightList = ({item}) => {
  const bookFlight = () => {
    alert("Flight Booked")
  }
  const ClosedCard = () => {
    return (
      <View  style={[styles.card]}>
        <View style={styles.firstLayer}>
          <Text style={styles.text}> {item.itineraries[0].segments[0].departure.iataCode} Airport</Text>
          <Text style={styles.text}>
          {item.itineraries[0].segments[1].departure.iataCode} Airport
          </Text>
        </View>
        <View style={styles.tripContainer}>
          <Text>{item.itineraries[0].segments[0].departure.iataCode}</Text>
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
          <Text>{item.itineraries[0].segments[1].departure.iataCode} </Text>
        </View>
        <View style={[styles.flexContainer, styles.mb]}>
          <Text style={styles.time}>{moment(item.itineraries[0].segments[0].departure.at).format('MMM Do YYYY, h:mm a')}</Text>
          <View style={[styles.flexContainer]}>
            <MaterialIcons name="timer" size={13} color={AppColor.gray} />
            <Text style={{fontSize: 11}}>{((new Date(item.itineraries[0].segments[1].departure.at) - new Date(item.itineraries[0].segments[0].departure.at))/(1000*60*60)).toFixed(1)}hours</Text>
          </View>
          <Text style={styles.time}>{moment(item.itineraries[0].segments[1].departure.at).format('MMM Do YYYY, h:mm a')}</Text>
        </View>
        <View style={[styles.flexContainer, styles.mb]}>
          <Text style={styles.flightClass}>{item.travelerPricings[0].fareDetailsBySegment[0].cabin} CLASS</Text>
          <Text style={styles.layoverText}>Non Stop</Text>
          <Text style={styles.seatLeft}>{item.numberOfBookableSeats} Seats Left</Text>
        </View>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          iterationDelay={500}
          style={styles.btnContainer}>
          <MyButton value="Book" action={bookFlight}/>
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
    fontWeight:"bold",
    fontSize:12
  },
  tripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
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
    fontSize: 11,
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
