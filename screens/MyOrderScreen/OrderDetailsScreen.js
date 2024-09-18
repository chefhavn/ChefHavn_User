import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import Colors from '../../utils/Colors';

export default function OrderDetailsScreen({navigation}) {
  const chef = {
    name: 'Chef John Doe',
    contact: '+1234567890',
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Order History</Text>
      </View>
      <Text style={styles.header}>Chef Details</Text>
      <View style={styles.chefDetailsContainer}>
        <Text style={styles.chefText}>Name: {chef.name}</Text>
        <Text style={styles.chefText}>Contact: {chef.contact}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  icon: {
    width: 24,
    height: 24,
  },
  chefDetailsContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    padding: 20,
    borderRadius: 8,
  },
  chefText: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.BLACK,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
