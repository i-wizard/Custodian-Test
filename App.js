import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';

import axios from 'axios';
import {CLIENT_SECRET, CLIENT_ID} from '@env';

import NoInternet from './app/components/NoInternet';
import Header from './app/components/Header';
import NetworkCheck from './app/utils/network';
import FlightList from './app/components/FlightList';
import {generateData} from './app/utils/dataGen';
import {MyStatusBar, AppColor, BigLoader} from './app/utils/helper';
import CircleButton from './app/components/CircleButton';
import Booking from './app/components/Booking';
import EmptyScreen from './app/components/EmptyScreen';
import SearchOptions from './app/components/SearchOption';
import PageSearch from './app/components/PageSearch';

const headerHeight = 70 * 2;
const {diffClamp} = Animated;

const App = () => {
  const [network, setNetwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Flights');
  const [flights, setFlights] = useState([]);
  const [flightSearch, setFlightSearch] = useState({
    show: true,
  });
  const [pageSearch, setPageSearch] = useState({
    show: false,
    value: '',
  });
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [data, setData] = useState([]);
  const ref = useRef(null);
  const scrollY = useRef(new Animated.Value(0));

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
    setSelectedTab(val);
  };
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
  const updatePageSearch = value => {
    setPageSearch({...pageSearch, value});
  };
  const startSearch = () => {
    setPageSearch({...pageSearch, show: false});
    pageSearch.value && alert(`Searching page for ${pageSearch.value} ...`);
  };
  // Not sure how long the access token last so the safest approach is to get a new one for each request.
  const getAccessToken = async () => {
    setFlightSearch({...flightSearch, show: false});
    setLoading(true);
    let config = {
      client_id: CLIENT_ID,
      grant_type: 'client_credentials',
      client_secret: CLIENT_SECRET,
    };
    const formBody = Object.entries(config)
      .map(
        ([key, value]) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(value),
      )
      .join('&');
    let url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    };
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: formBody,
      });
      let result = await response.json();
      getFlights(result.access_token);
    } catch (err) {
      let errMsg = err.response.data.message || err;
      alert('Something went wrong while fetching your flights');
      setLoading(false);
    }
  };
  const getFlights = async access_token => {
    let url =
      'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2021-11-01&adults=1&nonStop=false&max=250';
    let headers = {
      Authorization: `Bearer ${access_token}`,
    };
    let result;
    try {
      result = await axios.get(url, {
        headers,
      });
      let {data} = result.data;
      // If time permits, remember to paginate remaining dataset.
      data = data.slice(0, 7);
      setFlights(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    let mounted = true;
    checkNetworkConnection(mounted);
    setData(generateData(25));
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
          <Header
            headerHeight={headerHeight}
            selectedTab={selectedTab}
            changeSelectedTab={changeSelectedTab}
          />
          {loading && <BigLoader />}
        </Animated.View>
        {selectedTab !== 'Flights' ? (
          <EmptyScreen />
        ) : (
          <Animated.FlatList
            scrollEventThrottle={16}
            onScroll={handleScroll}
            contentContainerStyle={{paddingTop: headerHeight}}
            ref={ref}
            data={flights}
            renderItem={({item}) => <FlightList item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        )}
          <CircleButton
            style={styles.circleButton}
            openSearch={() => setShowSearchOptions(!showSearchOptions)}
          />
        {showSearchOptions && (
          <SearchOptions
            style={styles.searchOptions}
            openPageSearch={() => setPageSearch({...pageSearch, show: true})}
            openFlightSearch={() =>
              setFlightSearch({...flightSearch, show: true})
            }
          />
        )}
        <Modal
          transparent={true}
          visible={flightSearch.show}
          animationType="slide">
          <Booking
            close={() => setFlightSearch({...flightSearch, show: false})}
            searchFlight={getAccessToken}
          />
        </Modal>
        <Modal
          transparent={true}
          visible={pageSearch.show}
          animationType="slide">
          <PageSearch
            close={() => setPageSearch({...pageSearch, show: false})}
            searchValue={pageSearch.value}
            updateSearch={updatePageSearch}
            startSearch={startSearch}
          />
        </Modal>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
  },
  // Extra optimizations to be done for ios notch
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1
  },

  circleButton: {
    position: 'absolute',
    bottom: 35,
    right: 25,
    zIndex: 99,
  },
  searchOptions: {
    position: 'absolute',
    bottom: 45,
    right: 100,
    zIndex: 99,
  },
});

export default App;
