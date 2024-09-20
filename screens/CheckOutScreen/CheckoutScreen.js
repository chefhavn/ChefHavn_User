import React, {useState} from 'react';
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
import moment from "moment"

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

  const [isProcessing, setIsProcessing] = useState(false);

  // Function to format the date and time
  const formatDateTime = (dateString, timeString) => {
    // Split the time string into hours and minutes
    const [timePart, ampm] = timeString.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    
    // Convert to 24-hour format if needed
    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
  
    // Construct a new Date object using the date and time
    const [year, month, day] = dateString.split('-').map(Number);
    const dateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  
    // Format date as 'MM/DD/YYYY'
    const formattedDate = `${
      dateTime.getMonth() + 1
    }/${dateTime.getDate()}/${dateTime.getFullYear()}`;
  
    // Format time as 'HH:mm AM/PM'
    const formattedHours = dateTime.getUTCHours() % 12 || 12;
    const formattedMinutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes} ${formattedHours >= 12 ? 'PM' : 'AM'}`;
  
    return { formattedDate, formattedTime };
  };
    

  const {formattedDate, formattedTime} = formatDateTime(
    selectedDate,
    selectedTime,
  );


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

  const handleCheckout = () => {
  setIsProcessing(true);
  setTimeout(() => {
    setIsProcessing(false);
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
        <Text style={styles.screenTitle}>Checkout</Text>
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
  screenTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
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
