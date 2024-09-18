import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const EventDetailsCard = ({
  eventType,
  numberOfHours,
  numberOfPeople,
  guestQuantity,
  vegNonVeg,
  formattedDate,
  formattedTime
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        {/* <Image
          style={styles.titleIcon}
          source={require('../assets/icons/event.png')}
        /> */}
        <Text style={styles.eventTitle}>Event Details</Text>
      </View>
      
      {/* Event details as rows */}
      <View style={styles.row}>
        <Text style={styles.eventDetail}>Event Type:</Text>
        <Text style={styles.eventValue}>{eventType}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.eventDetail}>Hours:</Text>
        <Text style={styles.eventValue}>{numberOfHours}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.eventDetail}>People:</Text>
        <Text style={styles.eventValue}>{numberOfPeople}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.eventDetail}>Dishes:</Text>
        <Text style={styles.eventValue}>{guestQuantity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.eventDetail}>Cuisine Type:</Text>
        <Text style={styles.eventValue}>{vegNonVeg}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.eventDetail}>Date:</Text>
        <Text style={styles.eventValue}>{formattedDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.eventDetail}>Time:</Text>
        <Text style={styles.eventValue}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleIcon: {
    height: 25,
    width: 25,
    tintColor: '#000',
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  eventDetail: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
  },
  eventValue: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
});

export default EventDetailsCard;
