import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const ViewOrderScreen = ({route, navigation}) => {
  const {orderId} = route.params;

  // Placeholder data for the order
  const orderDetails = {
    orderId: orderId,
    items: [
      {id: 1, name: 'Item 1', quantity: 2, price: '$10'},
      {id: 2, name: 'Item 2', quantity: 1, price: '$5'},
    ],
    totalPrice: '$25',
    status: 'Pending',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order #{orderDetails.orderId}</Text>
      <Text style={styles.status}>Status: {orderDetails.status}</Text>
      <View style={styles.itemsSection}>
        {orderDetails.items.map(item => (
          <View key={item.id} style={styles.item}>
            <Text>{item.name}</Text>
            <Text>
              {item.quantity} x {item.price}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.total}>Total Price: {orderDetails.totalPrice}</Text>
      <Button title="Back to Orders" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  itemsSection: {
    marginBottom: 20,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ViewOrderScreen;
