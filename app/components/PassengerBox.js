import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';


const PassengerBox = props => {
  return (
    <View style={styles.num}>
      <TouchableOpacity
        onPress={() => props.updatePassenger(-1)}
        style={styles.box}>
        <Text>-</Text>
      </TouchableOpacity>
      <TextInput
        style={{...styles.box, paddingRight: 0, color:'#000'}}
        keyboardType="number-pad"
        value={props.passenger.toString()}
        onChangeText={val => props.valueChange(val)}
      />
      <TouchableOpacity
        style={styles.box}
        onPress={() => props.updatePassenger(1)}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  num: {
    flexDirection: 'row',
    marginTop: 10,
  },
  box: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#B9B7BD',
    padding: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default PassengerBox;
