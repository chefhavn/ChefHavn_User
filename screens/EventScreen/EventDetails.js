import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utils/Colors';
import {UserContext} from '../../context/UserContext';

const EventDetails = ({route}) => {
  const {title, imagePath, description} = route.params;
  const navigation = useNavigation();
  const {user} = useContext(UserContext);

  // Input states
  const [eventType, setEventType] = useState('Basic');
  const [numberOfHours, setNumberOfHours] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [guestQuantity, setGuestQuantity] = useState('');
  const [vegNonVeg, setVegNonVeg] = useState('Veg');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isEventTypeFilled = eventType !== '';
  const isFirstSectionFilled =
    isEventTypeFilled && numberOfHours && numberOfPeople;
  const isSecondSectionFilled =
    isFirstSectionFilled && guestQuantity && vegNonVeg;

  const handleBookNow = () => {
    // navigation.navigate('CheckoutScreen', {
    //   title,
    //   numberOfHours,
    //   numberOfPeople,
    //   guestQuantity,
    //   selectedDate,
    //   selectedTime,
    //   eventType,
    //   vegNonVeg,
    // });
    navigation.navigate('BookingScreen', {title, imagePath, description});
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) setSelectedTime(time);
  };

  const getDateLimit = () => {
    let date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  };

  return (
    <View style={{flex: 1}}>
      {/* Transparent Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        {/* <Text style={styles.screenTitle}>Event Details</Text> */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* <Image source={imagePath} style={styles.eventImage} /> */}
        <View>
          <Image source={imagePath} style={styles.eventImage} />
        </View>

        <View style={styles.detailsContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.eventTitle}>{title}</Text>
            <Text style={styles.eventDescription}>{description}</Text>
          </View>

          {/* Book Now Button */}
          {/* Conditional Button Rendering */}
          {user?.token ? (
            <TouchableOpacity
              style={[styles.bookButton]}
              onPress={handleBookNow}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => {
                navigation.navigate('Auth');
              }}>
              <Text style={styles.bookButtonText}>Login / Signup</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    color: '#fff', // White color for header title
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  eventImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  eventTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  eventDescription: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: Colors.BLACK,
    lineHeight: 24,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 15,
    overflow: 'hidden',
  },
  pickerItem: {
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBox: {
    flex: 1,
    marginRight: 10,
    marginBottom: 20,
    color: Colors.BLACK,
  },
  dropdownInput: {
    flex: 1,
    flexDirection: 'row',
    color: Colors.BLACK,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
    color: Colors.BLACK,
  },
  input: {
    height: 50,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    textAlign: 'left',
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  selected: {
    color: '#000',
  },
  placeholder: {
    color: '#ccc',
  },
  picker: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    outlineWidth: 1,
    outlineColor: Colors.PRIMARY,
    width: '100%',
    paddingRight: 20,
    fontFamily: 'Montserrat-Regular',
  },
  bookButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default EventDetails;
