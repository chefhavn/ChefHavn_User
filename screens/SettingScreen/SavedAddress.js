import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { UserContext } from '../../context/UserContext'; // Ensure this path is correct
import { fetchAllAddresses } from '../../services/api';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const SavedAddresses = () => {
  const navigation = useNavigation(); // Initialize navigation
  const { user } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const response = await fetchAllAddresses(user?.id);
      if (response.addresses) {
        setAddresses(response.addresses);
      }
    } catch (error) {
      console.error('Error during fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const renderAddressCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.addressType}>
          {item.type} {item.type === 'Other' && ` - ${item.otherName}`}
        </Text>
        <Text style={styles.nearbyLandmark}>{item.landmark}</Text>
        <Text style={styles.addressDetails}>{item.address}</Text>
      </View>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={styles.cardButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={renderAddressCard}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <View style={styles.noAddressContainer}>
              <Image
                source={require('../../assets/images/not-found.png')}
                style={styles.noAddressIcon}
              />
              <Text style={styles.noAddressText}>No address found</Text>
            </View>
          )
        }
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.PRIMARY,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
    flex: 1,
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 10,
  },
  addressType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  nearbyLandmark: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
  },
  addressDetails: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  cardButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  noAddressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noAddressIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  noAddressText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
});

export default SavedAddresses;
