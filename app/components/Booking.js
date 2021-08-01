import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import PassengerBox from './PassengerBox';
import {AppColor, MyButton} from '../utils/helper';
import {City} from '../utils/dataGen';

const Booking = props => {
  const [cities, setCities] = useState([]);
  const [calendarShow, setCalendarShow] = useState(false);
  const [activeDate, setActiveDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [departureDetail, setDepartureDetail] = useState({
    location: '',
    airport: '',
    date: '',
  });
  const [destinationDetail, setDestinationDetail] = useState({
    location: '',
    airport: '',
  });

  const setDeparture = val => {
    setDepartureDetail({...departureDetail, ...val});
  };
  const setDestination = val => {
    setDestinationDetail({...destinationDetail, ...val});
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || activeDate;
    setCalendarShow(false);
    setDepartureDetail({...departureDetail, date: currentDate});
  };
  const valueChange = val => {
    if (isNaN(val) || val < 0) {
      return;
    }
    setPassengers(val);
  };
  const updatePassenger = val => {
    setPassengers(prevValue => {
      if (prevValue === '') {
        return 0;
      }
      if (prevValue <= 0 && val == -1) {
        return 0;
      }
      return parseInt(prevValue) + val;
    });
  };

  useEffect(() => {
    let mounted = true;
    setCities(City);
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.modalTransparent}></View>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.cancel} onPress={() => props.close()}>
          <FontAwesome name="close" size={15} color={AppColor.gray} />
        </TouchableOpacity>
        <View style={[styles.flexContainer, {marginTop: 5}]}>
          <Text>From</Text>
          <Text>To</Text>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.cityStyle}>
              {departureDetail.abbr ? departureDetail.abbr : 'Departure'}
            </Text>
            {Platform.OS == 'android' &&
            <Picker
              selectedValue={departureDetail}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => setDeparture(itemValue)}
              mode="dialogue"
              prompt="Select Departure">
              <Picker.Item label="None" value="" />
              {cities.map(item => (
                <Picker.Item
                  key={item.id.toString()}
                  label={item.location}
                  value={item}
                />
              ))}
            </Picker>}
          </View>
          <View style={{...styles.pickerContainer}}>
            {Platform.OS == 'android' &&
            <Picker
              selectedValue={destinationDetail}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) =>
                setDestination(itemValue)
              }
              mode="dialogue"
              prompt="Select Destination">
              <Picker.Item label="None" value="" />
              {cities.map(item => (
                <Picker.Item
                  key={item.id.toString()}
                  label={item.location}
                  value={item}
                />
              ))}
            </Picker>}
            <Text style={styles.cityStyle}>
              {destinationDetail.abbr ? destinationDetail.abbr : 'Destination'}
            </Text>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.airportText}>
            {departureDetail.airport
              ? departureDetail.airport
              : 'Departure Airport'}
          </Text>
          <Text style={styles.airportText}>
            {destinationDetail.airport
              ? destinationDetail.airport
              : 'Destination Airport'}
          </Text>
        </View>
        <View style={styles.planeContainer}>
          <View style={styles.horizontalLine}></View>
          <Ionicons
            name="airplane"
            size={27}
            style={styles.plane}
            color={AppColor.green}
          />
          <View style={styles.horizontalLine}></View>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.lastText}>Select Departure Date</Text>
          <Text style={styles.lastText}>How many persons are flying</Text>
        </View>
        <View style={{...styles.flexContainer, marginVertical: 5}}>
          <TouchableOpacity onPress={() => setCalendarShow(true)}>
            <Text style={{...styles.lastText, fontWeight: 'bold', color:AppColor.orange}}>
              {departureDetail.date
                ? new Date(departureDetail.date).toDateString()
                : new Date().toDateString()}
            </Text>
          </TouchableOpacity>
          <PassengerBox
            passenger={passengers}
            updatePassenger={updatePassenger}
            valueChange={valueChange}
          />
        </View>
        {calendarShow ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={activeDate}
            mode="date"
            is24Hour={true}
            display="default"
            //maximumDate={new Date()}
            onChange={onChange}
          />
        ) : null}
        <View style={styles.btnContainer}>
          <MyButton action={() => props.searchFlight()} value="Search Flight" />
        </View>
      </View>

      <View style={styles.modalTransparent}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#fff',
    flex: 3.5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  modalTransparent: {
    flex: 3,
  },
  footer: {
    flex: 3,
  },
  cancel: {
    height: 25,
    width: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: AppColor.gray,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginVertical: 5,
  },
  pickerStyle: {
    height: 25,
    width: 30,
    //marginBottom: 4,
    marginLeft: 3,
  },
  cityStyle: {
    fontWeight: 'bold',
    color: AppColor.gray,
  },
  airportText: {
    fontSize: 10,
    color: AppColor.gray,
  },
  planeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  horizontalLine: {
    width: 80,
    height: 1,
    opacity: Platform.OS == 'ios' ? 0.1 : 0.2,
    backgroundColor: AppColor.gray,
  },
  lastText: {
    fontSize: 12,
    color: AppColor.gray,
  },
  btnContainer: {
    width: '30%',
    alignSelf: 'center'
  },
  plane: {
    marginHorizontal: 5,
  },

});
export default Booking;
