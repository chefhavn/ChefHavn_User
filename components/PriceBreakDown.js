import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../utils/Colors';

const PriceBreakDown = ({price, serviceFee, sgst, cgst, cook, total}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.titleIcon}
          source={require('../assets/icons/receipt.png')}
        />
        <Text style={styles.eventTitle}>Bill Summary</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.breakdownDetail}>Service Fee (25%):</Text>
        <Text style={styles.price}>₹{serviceFee.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.breakdownDetail}>SGST (9%):</Text>
        <Text style={styles.price}>₹{sgst.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.breakdownDetail}>CGST (9%):</Text>
        <Text style={styles.price}>₹{cgst.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.breakdownDetail}>Cook Fee:</Text>
        <Text style={styles.price}>₹{cook.toFixed(2)}</Text>
      </View>

      {/* Horizontal Divider */}
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalBill}>Total Bill:</Text>
        <Text style={styles.totalPrice}>₹{price.toFixed(2)}</Text>
      </View>

      {/* Light-colored text below Total Bill */}
      <Text style={styles.includingTaxes}>Including all taxes and charges</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  breakdownDetail: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
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
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  totalBill: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
  },
  includingTaxes: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#888',
    marginTop: 5,
    textAlign: 'left',
  },
});

export default PriceBreakDown;