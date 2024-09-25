import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Colors from '../../utils/Colors';
import { createBooking } from '../../services/api';
import { UserContext } from '../../context/UserContext';


const ThankYouScreen = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const route = useRoute();
  const {
    title,
    eventType,
    numberOfHours,
    numberOfPeople,
    guestQuantity,
    formattedDate,
    formattedTime,
    vegNonVeg,
    totalAmount,
    addressId
  } = route.params;

  console.log(addressId)

  console.log(route.params)

  const [isProcessing, setIsProcessing] = useState(false);

  const handleResponse = async (response) => {
    if (response === 'yes') {
      setIsProcessing(true);
      try {
        // Call the API to create a booking
        const result = await createBooking(
          user.id,
          title,
          eventType,
          numberOfHours,
          numberOfPeople,
          guestQuantity,
          vegNonVeg,
          totalAmount,
          formattedDate,
          formattedTime,
          'Hyderabad',
          addressId
        );
        if (result) {
          alert('Your payment is successful and order saved');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        alert('Failed to create the booking. Please try again.');
      } finally {
        setIsProcessing(false);
        navigation.navigate('Home');
      }
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Payment Confirmation</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.thankYouMessage}>Thank you for your purchase!</Text>

        {/* Yes/No Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.responseButton}
            onPress={() => handleResponse('yes')}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.responseButtonText}>Yes</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.responseButton}
            onPress={() => handleResponse('yes')}
          >
            <Text style={styles.responseButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  screenTitle: {
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  thankYouMessage: {
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  responseButton: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  responseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ThankYouScreen;
