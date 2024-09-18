import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import moment from 'moment';
import { getBookingsByUserId } from '../../services/api';
import Colors from '../../utils/Colors';
import { UserContext } from '../../context/UserContext';
import AuthPrompt from '../../components/AuthPrompt';
import BottomSpacer from '../../components/BottomSpacer';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

export default function MyOrderScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);

  // Function to fetch bookings
  const fetchBookings = async () => {
    if (user?.id) {
      try {
        const response = await getBookingsByUserId(user?.id);
        if (response?.bookings?.length) {
          setBookings(response.bookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        Alert.alert(
          'Error',
          'There was an issue fetching your bookings. Please try again later.',
          [{ text: 'OK' }],
        );
      }
    }
  };

  // Use useFocusEffect to refetch bookings when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, [])
  );

  const getFormattedDateTime = (date) => {
    return moment(date).format('DD MMM, h:mm A');
  };

  const isWithinTwoHours = (date) => {
    const now = moment();
    const bookingTime = moment(date);
    return bookingTime.diff(now, 'hours') <= 2 && bookingTime.isAfter(now);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>My Orders</Text>
      </View>

      {!user?.token && <AuthPrompt navigation={navigation} />}

      {user?.token && bookings.length === 0 && <Text>No Order Found</Text>}

      {user?.token && bookings.length > 0 && (
        <>
          {bookings?.map((booking) => (
            <View style={styles.orderItem} key={booking._id}>
              <View style={styles.orderHeader}>
                <View style={styles.orderDetails}>
                  <Text style={styles.restaurantName}>
                    {booking.event_type}
                  </Text>
                  <Text style={styles.restaurantLocation}>
                    {booking.cuisine_type}
                  </Text>
                </View>
              </View>

              <View style={styles.orderContent}>
                <Text style={styles.orderItemText}>
                  Scheduled Date: {getFormattedDateTime(booking.date)}
                </Text>
              </View>

              <View style={styles.orderMetaContainer}>
                <Text style={styles.orderDate}>
                  Placed on {getFormattedDateTime(booking.created_at)}
                </Text>
                <Text style={styles.orderStatus}>{booking.status}</Text>
              </View>

              {isWithinTwoHours(booking.date) && (
                <>
                  <Text style={styles.otpText}>
                    OTP for chef: {booking.booking_number.slice(-4)}
                  </Text>
                  <TouchableOpacity style={styles.chefDetailsButton}>
                    <Text style={styles.chefDetailsText}>
                      View Order Details
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))}
        </>
      )}

      <BottomSpacer marginBottom={120} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    marginLeft: 16,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-SemiBold',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: Colors.BLACK,
  },
  filterOptionsContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  filterOption: {
    fontSize: 14,
    paddingVertical: 4,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  orderItem: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.BLACK,
  },
  restaurantLocation: {
    fontSize: 14,
    color: Colors.BLACK,
    marginBottom: 4,
    fontFamily: 'Montserrat-Regular',
  },
  viewMenuText: {
    fontSize: 14,
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-SemiBold',
  },
  orderContent: {
    marginTop: 8,
  },
  orderItemText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.BLACK,
  },
  orderSubItemText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 4,
  },
  orderMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  orderStatus: {
    fontSize: 14,
    color: Colors.GREEN,
    fontFamily: 'Montserrat-SemiBold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  otpText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  chefDetailsButton: {
    marginTop: 10,
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  chefDetailsText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});
