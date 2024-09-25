import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import SelectMeal from './SelectMeal';
import {UserContext} from '../../context/UserContext';
import Colors from '../../utils/Colors';

const OPTIONS = [
  {label: 'Proffesional', value: 'proffesional'},
  {label: 'Basic', value: 'Basic'},
];

const BookingScreen = ({route}) => {
  const {title, imagePath, description} = route.params;
  const [chefType, setChefType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const options = [
    {label: 'Professional', value: 'professional'},
    {label: 'Basic', value: 'basic'},
  ];
  const [hours, setHours] = useState('');
  const [showChefDropdown, setShowChefDropdown] = useState(false);
  const [showHoursDropdown, setShowHoursDropdown] = useState(false);
  const [dishes, setDishes] = useState('');
  const [selectedOption, setSelectedOption] = useState('veg');
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const {user} = useContext(UserContext);

  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [breakFastTime, setBreakFastTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');

  // Function to get the hour options based on chefType
  const getHourOptions = () => {
    if (chefType === 'Basic') {
      return Array.from({length: 10}, (_, i) => i + 1); // Numbers from 1 to 10
    } else if (chefType === 'Professional') {
      return Array.from({length: 16}, (_, i) => i + 10); // Numbers from 10 to 25
    }
    return [];
  };

  const navigation = useNavigation();

  const handleBookNow = () => {
    let selectedTime = '';
    if (breakFastTime) {
      selectedTime = breakFastTime;
    } else if (lunchTime) {
      selectedTime = lunchTime;
    } else if (dinnerTime) {
      selectedTime = dinnerTime;
    }

    navigation.navigate('CheckoutScreen', {
      title,
      numberOfHours: hours,
      numberOfPeople: numberOfGuests,
      guestQuantity: dishes,
      selectedDate,
      selectedTime,
      eventType: chefType,
      vegNonVeg: selectedOption,
    });
    // navigation.navigate('BookingScreen');
  };

  const isFormValid = () => {
    return (
      chefType && hours && dishes && selectedDate && breakFastTime
    );
  };

  // Generate the next 5 dates
  const dates = [...Array(5).keys()].map(offset =>
    moment()
      .add(offset + 1, 'days')
      .format('YYYY-MM-DD'),
  );

  const handleGuestSelection = number => {
    setNumberOfGuests(number);
  };

  const handleDateSelection = date => {
    setSelectedDate(date);
  };

  const handleOptionSelect = value => {
    setChefType(value);
    // Keep the modal open
  };

  

  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      <ImageBackground
        style={styles.topSection}
        source={imagePath}
        resizeMode="cover">
        {/* Black Overlay */}
        <View style={styles.overlay} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.navigate('EventDetails', {title, imagePath, description})
          }>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Book a Chef</Text>
        <Text style={styles.description}>{title}</Text>

        {/* DROP DOWN */}
        <View style={styles.topDropdown}>
          <View style={styles.dropdownRow}>
            {/* Chef Type Picker */}
            <View style={styles.dropdownContainerTransparent}>
              <Picker
              className="picker"
                selectedValue={chefType}
                onValueChange={itemValue => setChefType(itemValue)}
                style={{
                  inputIOS: styles.picker,
                  inputAndroid: styles.picker,
                  placeholder: {
                    color: Colors.WHITE,
                  },
                  color: Colors.WHITE,
                }}>
                <Picker.Item label="Chef Type" value="" />
                <Picker.Item label="Basic" value="Basic" />
                <Picker.Item label="Professional" value="Professional" />
              </Picker>
            </View>

            {/* Hours Picker */}
            <View style={styles.dropdownContainerTransparent}>
              <Picker
                selectedValue={hours}
                onValueChange={itemValue => setHours(itemValue)}
                style={{
                  inputIOS: styles.picker,
                  inputAndroid: styles.picker,
                  placeholder: {
                    color: Colors.WHITE,
                  },
                  color: Colors.WHITE,
                }}>
                <Picker.Item label="Guests" value="" />
                {/* Dynamically render hour options based on chefType */}
                {getHourOptions().map(hour => (
                  <Picker.Item key={hour} label={`${hour}`} value={hour} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Form Section */}
      <View style={styles.formSection}>
        {/* VEG NON-VEG DISHES INPUT */}
        <View style={styles.vegNonVegDishesContainer}>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={dishes}
              onValueChange={itemValue => setDishes(itemValue)}
              style={{
                inputIOS: styles.picker,
                inputAndroid: styles.picker,
                placeholder: {
                  color: Colors.BLACK,
                },
                color: Colors.BLACK,
              }}>
              <Picker.Item label="Dishes" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>

          <View style={styles.vegNonVegButtonContainer}>
            <TouchableOpacity
              style={[
                styles.vegButton,
                selectedOption === 'veg' && styles.activeVegButton,
              ]}
              onPress={() => setSelectedOption('veg')} // Handle veg selection
            >
              <View style={styles.vegButtonContent}>
                <Image
                  source={require('../../assets/images/veglogo.jpeg')}
                  style={styles.vegLogo}
                />
                <Text
                  style={[
                    styles.vegText,
                    selectedOption === 'veg' && styles.activeVegText,
                  ]}>
                  Veg
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nonVegButton,
                selectedOption === 'nonveg' && styles.activeNonVegButton,
              ]}
              onPress={() => setSelectedOption('nonveg')}>
              <View style={styles.nonVegButtonContent}>
                <Image
                  source={require('../../assets/images/nonveg.jpeg')}
                  style={styles.nonVegLogo}
                />
                <Text
                  style={[
                    styles.nonVegText,
                    selectedOption === 'nonveg' && styles.activeNonVegText,
                  ]}>
                  Non-Veg
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Number of Guests Section */}
        <View style={styles.guestsContainer}>
          <Text style={styles.guestsHeading}>Number of Hours</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.guestsButtonsContainer}>
              {[...Array(7).keys()].map(i => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.guestButton,
                    numberOfGuests === i + 1 && styles.guestButtonActive,
                  ]}
                  onPress={() => handleGuestSelection(i + 1)}>
                  <Text
                    style={[
                      styles.guestButtonText,
                      numberOfGuests === i + 1 && styles.guestButtonTextActive,
                    ]}>
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* DATES CONTAINER */}
        <View style={styles.datesContainer}>
          <Text style={styles.datesHeading}>Select the Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.datesButtonsContainer}>
              {dates.map((date, index) => {
                const isTomorrow = index === 0;
                const displayDate = moment(date).format('D MMM');
                const dayOfWeek = isTomorrow
                  ? 'Tomorrow'
                  : moment(date).format('ddd');

                return (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.dateButton,
                      selectedDate === date && styles.dateButtonActive,
                    ]}
                    onPress={() => handleDateSelection(date)}>
                    <Text
                      style={[
                        styles.dateDay,
                        selectedDate === date && styles.dateDayActive,
                      ]}>
                      {dayOfWeek}
                    </Text>
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate === date && styles.dateTextActive,
                      ]}>
                      {displayDate}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* MEAL TYPE & TIME SLOT SECTION */}
          <View style={styles.timeSection}>
            <Text style={styles.timeSectionHeading}>
              Select the time and Meal Type
            </Text>

            <SelectMeal
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
              breakFastTime={breakFastTime}
              setBreakFastTime={setBreakFastTime}
              lunchTime={lunchTime}
              setLunchTime={setLunchTime}
              dinnerTime={dinnerTime}
              setDinnerTime={setDinnerTime}
            />
          </View>
        </View>

        {user?.token ? (
          <TouchableOpacity
          style={[
            styles.bookButton,
            { opacity: isFormValid() ? 1 : 0.5 },
          ]}
          onPress={isFormValid() ? handleBookNow : null}
          disabled={!isFormValid()}
        >
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
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d9c8e3',
  },
  topSection: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
    zIndex: -5,
    position: 'relative',
    borderBottomLeftRadius: 50
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
    fontFamily: 'Montserrat-Regular',
  },
  topDropdown: {
    width: '100%',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  dropdownContainerTransparent: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.TRANSPARENT_PICKER,
    borderRadius: 20,
  },
  picker: {
    height: 50,
    color: '#000',
    borderRadius: 20,
    fontSize: 16,
    paddingLeft: 6,
    fontFamily: 'Montserrat-Regular',
  },
  formSection: {
    // flex: 1,
    backgroundColor: '#d9c8e3',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 10,
    zIndex: -1,
  },
  guestsContainer: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 20,
  },

  vegNonVegDishesContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center buttons
    gap: 4,
    borderRadius: 10,
    marginBottom: 20,
  },
  dishesContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  dishesInput: {
    height: 50,
    color: '#000',
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 6,
    width: 174,
    fontFamily: 'Montserrat-Bold',
  },
  vegNonVegButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    // padding: 2,
  },
  vegButton: {
    borderRadius: 24,
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4, // Space between buttons
    backgroundColor: '#ffffff', // Default background
  },
  vegButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vegLogo: {
    width: 24, // Adjust the size as needed
    height: 24, // Adjust the size as needed
    marginRight: 8, // Space between logo and text
  },
  nonVegButton: {
    borderRadius: 24,
    width: 120,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Default background
  },
  nonVegButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nonVegLogo: {
    width: 24, // Adjust the size as needed
    height: 24, // Adjust the size as needed
    marginRight: 8, // Space between logo and text
  },
  vegText: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: '2px',
  },
  nonVegText: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: '2px',
  },
  activeVegButton: {
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#e0ffe0', // Light green background
  },
  activeNonVegButton: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#ffe0e0', // Light red background
  },
  activeVegText: {
    color: 'green',
  },
  activeNonVegText: {
    color: 'red',
  },

  guestsHeading: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 16,
    color: Colors.BLACK,
  },
  guestsButtonsContainer: {
    flexDirection: 'row',
  },
  guestButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'white',
  },
  guestButtonActive: {
    borderWidth: 2,
    borderColor: '#503a73',
    backgroundColor: '#d9c8e3',
  },
  guestButtonText: {
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  guestButtonTextActive: {
    color: '#503a73',
  },
  datesContainer: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  datesHeading: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 16,
    color: Colors.BLACK,
  },
  datesButtonsContainer: {
    flexDirection: 'row',
  },
  dateButton: {
    width: 74,
    height: 80,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'white',
  },
  dateButtonActive: {
    borderWidth: 2,
    borderColor: '#503a73',
    backgroundColor: '#d9c8e3',
  },
  dateText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  dateTextActive: {
    color: '#503a73',
  },
  dateDay: {
    color: 'gray',
    fontSize: 12,
  },
  dateDayActive: {
    color: '#503a73',
  },
  timeSection: {
    marginTop: 20,
  },
  timeSectionHeading: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  placeholder: {
    fontSize: 16,
    color: '#777',
  },
  modalContainer: {
    position: 'absolute',
    top: '100%', // Position below the select input
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    marginTop: -20, // Adjust to place it directly below
    zIndex: 0,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
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
