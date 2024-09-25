import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import { getBookingById } from '../../services/api'; // Import your API function
import BottomSpacer from '../../components/BottomSpacer';

const ViewOrderScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  console.log(orderId);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getBookingById(orderId);
        console.log(response); 
        setOrderDetails(response.booking);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Show a loading state while fetching order details
  if (!orderDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Define the timeline statuses and colors
  const statuses = [
    { name: 'Pending', color: orderDetails.status === 'New' ? 'green' : 'gray' },
    { name: 'Order Confirmed', color: orderDetails.status === 'Order Confirmed' ? 'green' : 'gray' },
    { name: 'Chef On the way', color: orderDetails.status === 'Chef On the way' ? 'green' : 'gray' },
    { name: 'Completed', color: orderDetails.status === 'Completed' ? 'green' : 'gray' },
    { name: 'Canceled', color: orderDetails.status === 'Rejected' ? 'red' : 'transparent' }, // Hide unless rejected
  ];

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Order Summary</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.orderTitle}>Order #{orderDetails._id}</Text>

        {/* Horizontal Timeline */}
        <View style={styles.timeline}>
          {statuses.map((status, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={[styles.circle, { backgroundColor: status.color }]} />
              <Text style={[styles.statusName, { opacity: status.color === 'transparent' ? 0 : 1 }]}>{status.name}</Text>
              {index < statuses.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>
          ))}
        </View>

        {/* Displaying the details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Address:</Text>
          <Text style={styles.detailText}>{orderDetails.address}</Text>

          <Text style={styles.sectionTitle}>Booking Duration:</Text>
          <Text style={styles.detailText}>{orderDetails.booking_duration} hours</Text>

          <Text style={styles.sectionTitle}>Booking Number:</Text>
          <Text style={styles.detailText}>{orderDetails.booking_number}</Text>

          <Text style={styles.sectionTitle}>Cook Type:</Text>
          <Text style={styles.detailText}>{orderDetails.cook_type}</Text>

          <Text style={styles.sectionTitle}>Cuisine Type:</Text>
          <Text style={styles.detailText}>{orderDetails.cuisine_type}</Text>

          <Text style={styles.sectionTitle}>Event Type:</Text>
          <Text style={styles.detailText}>{orderDetails.event_type}</Text>

          <Text style={styles.sectionTitle}>No of Dishes:</Text>
          <Text style={styles.detailText}>{orderDetails.no_of_dishes}</Text>

          <Text style={styles.sectionTitle}>No of People:</Text>
          <Text style={styles.detailText}>{orderDetails.no_of_people}</Text>

          <Text style={styles.sectionTitle}>Price:</Text>
          <Text style={styles.detailText}>₹{orderDetails.price}</Text>

          <Text style={styles.sectionTitle}>Status:</Text>
          <Text style={styles.detailText}>{orderDetails.status}</Text>

          <Text style={styles.sectionTitle}>Location:</Text>
          <Text style={styles.detailText}>{orderDetails.location}</Text>

          <Text style={styles.sectionTitle}>Date:</Text>
          <Text style={styles.detailText}>{new Date(orderDetails.date).toLocaleDateString()}</Text>
        </View>

        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Orders</Text>
        </TouchableOpacity> */}
        <BottomSpacer marginBottom={100} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    position: 'relative',
  },
  timelineItem: {
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  statusName: {
    fontWeight: 'bold',
  },
  timelineLine: {
    position: 'absolute',
    top: 10,
    width: '100%',
    height: 2,
    backgroundColor: Colors.PRIMARY,
    left: '50%',
    marginLeft: -50, // Adjust this to center the line
  },
  detailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  detailText: {
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
  },
  backButtonText: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ViewOrderScreen;
