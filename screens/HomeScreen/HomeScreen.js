import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import {UserContext} from '../../context/UserContext';
import Colors from '../../utils/Colors';
import BottomSpacer from '../../components/BottomSpacer';
import {EventCard} from '../../components/EventCard';
import {LocationContext} from '../../context/LocationContext';
import {getRecentBookingByUserId} from '../../services/api';

const images = [
  require('../../assets/images/slider/slide-1.png'),
  require('../../assets/images/slider/slide-2.png'),
  require('../../assets/images/slider/slider-3.png'),
];

const formatText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const HomeScreen = ({navigation}) => {
  const {user, logoutUser} = useContext(UserContext);
  const {locationDetails} = useContext(LocationContext);
  const carouselRef = useRef(null);
  const scrollX = new Animated.Value(0);
  const [recentOrder, setRecentOrder] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchRecentOrder = async () => {
      if (user?.id) {
        try {
          const response = await getRecentBookingByUserId(user.id);
          console.log(response)
          if (response.success) {
            setRecentOrder(response.booking);
          } else {
            setRecentOrder(null);
          }
        } catch (error) {
          console.error('Failed to fetch recent order:', error);
          setRecentOrder(null);
        }
      }
    };

    fetchRecentOrder();
  }, [user]);

  useEffect(() => {
    let position = 0;
    const interval = setInterval(() => {
      position = position === images.length - 1 ? 0 : position + 1;
      carouselRef.current.scrollToIndex({index: position, animated: true});
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logoutUser();
            navigation.navigate('Auth');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  const handleMapScreen = () => {
    navigation.navigate('SelectLocation');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/location.png')}
              style={styles.locationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMapScreen}>
            <Text style={styles.locationText}>
              {/* {locationDetails ? formatText(locationDetails.name, 12) : 'Hyderabad'} */}
              {locationDetails ? locationDetails?.name : 'Hyderabad'}
            </Text>
            <Text style={styles.subLocationText}>
              {locationDetails
                ? formatText(locationDetails.address, 30)
                : 'Hi-Tech City Metro Station'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={require('../../assets/images/notifications.png')}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>

      {user?.name && (
        <>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              {user?.token
                ? `Welcome Back, ${user.name}!!`
                : `Welcome Back, Guest!!`}
            </Text>
          </View>
        </>
      )}
      <FlatList
        data={images}
        // renderItem={renderItem}
        renderItem={({item, index}) => (
          <View key={index} style={{margin: 10}}>
            <Image source={item} style={styles.sliderImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        ref={carouselRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />

      {/* {renderRecentBooking()} */}
      {user?.token && recentOrder && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Recent Order Status</Text>
          </View>
          <View style={styles.orderSection}>
            <View>
              <Text style={styles.orderText}>Order #{recentOrder?.booking_number?.split('-').pop()}</Text>
              <Text style={styles.orderStatus}>{recentOrder.status}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewOrderButton}
              onPress={() =>
                navigation.navigate('ViewOrderScreen', {
                  orderId: recentOrder._id,
                })
              }
              >
              <Text style={styles.viewOrderButtonText}>View Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.sectionHeaderServices}>
        <View style={styles.line} />
        <Text style={styles.sectionHeaderServicesText}>Explore</Text>
        <View style={styles.line} />
      </View>

      {/* {renderCard()}
      {renderCard()} */}

      {EventCard({
        imagePath: require('../../assets/images/slider/slide-2.png'),
        title: 'Basic Event',
        subtitle: 'Up to 10 people',
        discountText: 'Content Offer #1',
        description: 'Content Subheading Basic Event',
      })}

      {EventCard({
        imagePath: require('../../assets/images/slider/slider-3.png'),
        title: 'Large Event',
        subtitle: 'More than 10 and Upto 25 people',
        discountText: 'Content Offer #2',
        description: 'Content Subheading Large Event',
      })}

      <BottomSpacer marginBottom={80} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: Colors.WHITE,
  },
  sliderImage: {
    width: 370,
    height: 220,
    borderRadius: 10,
    objectFit: 'cover',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  locationText: {
    marginTop: 10,
    marginVertical: 2,
    fontSize: 16,
    width: 280,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.PRIMARY,
  },
  subLocationText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  welcomeContainer: {
    width: '100%',
    paddingLeft: 10,
  },
  orderSection: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.WHITE,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    borderRadius: 10,
  },
  orderText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    fontFamily: 'Montserrat-Regular',
  },
  orderStatus: {
    fontSize: 14,
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-Regular',
  },
  viewOrderButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewOrderButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  noOrderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.WHITE,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    borderRadius: 10,
  },
  noOrderText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  noOrderIcon: {
    width: 50,
    height: 50,
  },
  welcomeText: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'left',
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-Bold',
  },
  imageContainer: {
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    textAlign: 'left',
  },
  sectionHeaderText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-SemiBold',
  },
  sectionHeaderServices: {
    flexDirection: 'row',
    alignItems: 'flex-center',
    marginTop: 15,
    width: '92%',
  },
  sectionHeaderServicesText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: Colors.PRIMARY,
    position: 'relative',
    // bottom: ,
    fontFamily: 'Montserrat-SemiBold',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.BLACK,
    position: 'relative',
    top: 12,
  },
  recentBookingCard: {
    width: '90%',
    height: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },

  carouselContainer: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
