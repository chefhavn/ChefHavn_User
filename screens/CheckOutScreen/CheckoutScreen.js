import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Colors from '../../utils/Colors';
import PriceBreakDown from '../../components/PriceBreakDown';
import EventDetailsCard from '../../components/EventDetailsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocationContext} from '../../context/LocationContext';
import moment from 'moment';

const formatText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    title,
    numberOfHours,
    numberOfPeople,
    guestQuantity,
    selectedDate,
    selectedTime,
    eventType,
    vegNonVeg,
  } = route.params;
  const {locationDetails} = useContext(LocationContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUserName(userData.name);
          setPhoneNumber(userData.phone);
        }
      } catch (error) {
        console.error('Failed to load user details from AsyncStorage', error);
      }
    };
    fetchUserDetails();
  }, []);
  

  // Function to format the date and time
  const formatDateTime = (dateString, timeString) => {
    const [timePart, ampm] = timeString.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }

    const [year, month, day] = dateString.split('-').map(Number);
    const dateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    const formattedDate = `${
      dateTime.getMonth() + 1
    }/${dateTime.getDate()}/${dateTime.getFullYear()}`;

    const formattedHours = dateTime.getUTCHours() % 12 || 12;
    const formattedMinutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes} ${
      formattedHours >= 12 ? 'PM' : 'AM'
    }`;

    return {formattedDate, formattedTime};
  };

  const {formattedDate, formattedTime} = formatDateTime(
    selectedDate,
    selectedTime,
  );

  const handleMapScreen = () => {
    navigation.navigate('SelectLocation');
  };

  const getPrice = () => {
    const priceBreakup = {
      2: {basicCookPrice: 599, professionalPrice: 899},
      3: {basicCookPrice: 699, professionalPrice: 999},
      4: {basicCookPrice: 799, professionalPrice: 1199},
      5: {basicCookPrice: 899, professionalPrice: 1299},
      6: {basicCookPrice: 999, professionalPrice: 1499},
      7: {basicCookPrice: 1099, professionalPrice: 1599},
      8: {basicCookPrice: 1199, professionalPrice: 1799},
      9: {basicCookPrice: 1299, professionalPrice: 1899},
      10: {basicCookPrice: 1399, professionalPrice: 2099},
    };
    if (!priceBreakup[numberOfHours]) return 0;
    return eventType === 'Basic'
      ? priceBreakup[numberOfHours].basicCookPrice
      : priceBreakup[numberOfHours].professionalPrice;
  };

  const price = getPrice();
  const serviceFee = price * 0.25;
  const sgst = serviceFee * 0.09;
  const cgst = serviceFee * 0.09;
  const cook = price * 0.75 - (sgst + cgst);
  const totalAmount = price;

  console.log(locationDetails)

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      const locationDetailsString = `${locationDetails?.name}|${locationDetails?.address}|${locationDetails?.latitude}|${locationDetails?.longitude}`;

      // Pass booking details to ThankYouScreen
      navigation.navigate('ThankYouScreen', {
        title,
        eventType,
        numberOfHours,
        numberOfPeople,
        guestQuantity,
        formattedDate,
        formattedTime,
        vegNonVeg,
        totalAmount,
        addressId: locationDetailsString,
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMapScreen}>
          <Text style={styles.locationText}>
            {locationDetails ? locationDetails?.name : 'Hyderabad'}
          </Text>
          <Text style={styles.subLocationText}>
            {locationDetails
              ? formatText(locationDetails.address, 30)
              : 'Hi-Tech City Metro Station'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.detailsContainer}>
          <View style={styles.section}>
            <EventDetailsCard
              eventType={title}
              numberOfHours={numberOfHours}
              numberOfPeople={numberOfPeople}
              guestQuantity={guestQuantity}
              vegNonVeg={vegNonVeg}
              formattedDate={formattedDate}
              formattedTime={formattedTime}
            />
          </View>

          <View style={styles.section}>
            <PriceBreakDown
              price={price}
              serviceFee={serviceFee}
              sgst={sgst}
              cgst={cgst}
              cook={cook}
            />
          </View>

          {/* Selected Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Address</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                {locationDetails ? locationDetails.address : 'No address selected'}
              </Text>
            </View>
          </View>

          {/* User Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.contactInfoContainer}>
              <Text style={styles.contactInfoText}>Name: {userName}</Text>
              <Text style={styles.contactInfoText}>Phone: {phoneNumber}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
            disabled={isProcessing}>
            {isProcessing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  addressText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
  },
  contactInfoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  contactInfoText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerInfo: {
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  deliveryAddress: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleIcon: {
    height: 25,
    width: 25,
    tintColor: Colors.PRIMARY,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.PRIMARY,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  eventDetail: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    marginBottom: 10,
  },
  breakdownDetail: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.PRIMARY,
    marginTop: 10,
  },

  checkoutButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    height: 75,
  },
  checkoutButtonText: {
    color: Colors.WHITE,
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
});

export default CheckoutScreen;
