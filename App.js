import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Animated,
  FlatList,
  Dimensions,
  Modal
} from 'react-native';


import NoInternet from './app/components/NoInternet';
import Header from './app/components/Header';
import NetworkCheck from './app/utils/network';
import ListItem from './app/components/Flights';
import FlightList from './app/components/FlightList';
import {generateData} from './app/utils/dataGen';
import {MyStatusBar, AppColor} from './app/utils/helper';
import CircleButton from './app/components/CircleButton';
import Booking from './app/components/Booking';


const headerHeight = 70 * 2;
const {diffClamp} = Animated;

const App = () => {
  const [network, setNetwork] = useState(null);
  const [selectedTab, setSelectedTab] =  useState('Flights')
  const [flightSearch, setFlightSearch]  = useState({
    show:false
  })
  const ref = useRef(null);
  const scrollY = useRef(new Animated.Value(0));
  const data = generateData(25);

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const changeSelectedTab = val => {
    setSelectedTab(val)

  }
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });
  const translateYNumber = useRef();
  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });
  const checkNetworkConnection = async mounted => {
    const isConnected = await NetworkCheck.isNetworkAvailable();
    mounted && setNetwork(isConnected);
  };
  useEffect(() => {
    let mounted = true;
    checkNetworkConnection(mounted);
    return () => {
      mounted = false;
    };
  }, []);

  if (network === null) return null;
  else if (network === false) {
    return <NoInternet checkNetworkConnection={checkNetworkConnection} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <MyStatusBar />
        <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
          <Header headerHeight={headerHeight} selectedTab={selectedTab} changeSelectedTab={changeSelectedTab}/>
        </Animated.View>

        <Animated.FlatList
          scrollEventThrottle={16}
          onScroll={handleScroll}
          contentContainerStyle={{paddingTop: headerHeight}}
          ref={ref}
          data={data}
          renderItem={FlightList}
          keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
        />
        <CircleButton style={styles.circleButton} openSearch={() => setFlightSearch({...flightSearch, show:true})}/>
        <Modal
        transparent={true}
        visible={flightSearch.show}
        animationType="slide">
        <Booking
            close={() => setFlightSearch({...flightSearch, show:false})}
        />
      </Modal>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f2f3f5',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    // backgroundColor:'green',
    zIndex: 1
  },

  circleButton:{
    position:'absolute',
    bottom:35,
    right:25,
    zIndex:99
  }
});

export default App;
