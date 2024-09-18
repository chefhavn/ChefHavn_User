import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';

export default function BusinessList() {
  const basicEvents = [
    {
      id: '1',
      imgSrc: require('../../assets/images/slider/slide-2.png'),
      category: 'basic',
      subCategory: 'smallParty',
      name: 'Small Event',
      price: '100₹',
      description: 'Content',
      quantity: 'Up to 10 people',
      rating: '4.2',
      distance: '2.6 km',
      offer: 'Flat 20% OFF',
      location: '#',
      cost: '₹1400 for two',
      cuisine: 'Andhra • Biryani',
    },
    // Add more basic events here
  ];

  const professionalEvents = [
    {
      id: '2',
      imgSrc: require('../../assets/images/slider/slider-3.png'),
      category: 'professional',
      subCategory: 'smallParty',
      name: 'Large Event',
      price: '200₹',
      description: 'Content',
      quantity: 'Up to 20 people',
      rating: '4.8',
      distance: '3.0 km',
      offer: 'Flat 15% OFF',
      location: '#',
      cost: '₹2000 for two',
      cuisine: 'Hyderabadi • Biryani',
    },
    // Add more professional events here
  ];

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={item.imgSrc} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.offerSection}>
          <Text style={styles.offerText}>{item.offer} + 3 more</Text>
        </View>
        <View style={styles.otherContent}>
          <View style={styles.row}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cardLocation}>{item.location}</Text>
            <Text style={styles.distance}>{item.distance}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cuisine}>{item.cuisine}</Text>
            <Text style={styles.cost}>{item.cost}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.scene}>
        <FlatList
          data={basicEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />
      </View>
      <View style={styles.scene}>
        <FlatList
          data={professionalEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 10,
    padding: 0,
    width: 300,
    position: 'relative',
    backgroundColor: '#F5F5F5', // Add a background color to the card
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    fontFamily: 'Montserrat-Regular',
  },
  offerSection: {
    backgroundColor: 'rgba(44, 125, 249, 0.8)', // Solid color with some transparency
    padding: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    fontFamily: 'Montserrat-Regular',
  },
  offerText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  otherContent: {
    backgroundColor: 'white',
    padding: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  rating: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  cardLocation: {
    color: '#666',
  },
  distance: {
    color: '#666',
  },
  cuisine: {
    color: '#666',
  },
  cost: {
    color: '#666',
  },
  scene: {
    marginTop: 10,
  },
  horizontalList: {
    paddingLeft: 10,
  },
});
