import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Colors from '../../utils/Colors';
import {
  fetchAllAddresses,
  setPrimaryAddress,
  deleteAddress,
} from '../../services/api';
import {UserContext} from '../../context/UserContext';
import AuthPrompt from '../../components/AuthPrompt';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {LocationContext} from '../../context/LocationContext';
import { useFocusEffect } from '@react-navigation/native';

export default function SelectLocation({navigation}) {
  const [menuVisible, setMenuVisible] = useState(null);
  const { user } = useContext(UserContext);
  const { storeLocationDetails } = useContext(LocationContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [primaryAddressId, setPrimaryAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchInput, setSearchInput] = useState('');

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

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index); // Toggle menu visibility
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.token) {
        loadAddresses();
      }
    }, [user])
  );

  const getCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'We need access to your location to provide better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });

            Alert.alert(
              'Success',
              `Latitude: ${latitude}, Longitude: ${longitude}`
            );
          },
          error => {
            console.error('Error fetching location:', error);
            Alert.alert('Error', 'Unable to fetch location. Please try again.');
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      } else {
        Alert.alert('Permission Denied', 'Location permission was denied.');
      }
    } catch (err) {
      console.warn('Error in getCurrentLocation:', err);
      Alert.alert(
        'Error',
        'An unexpected error occurred while getting location.'
      );
    }
  };

  const handleAutoPlaceSelect = details => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      const name = details.name || 'Unknown';
      const address = details.formatted_address || 'No address available';

      storeLocationDetails({
        placeId: details.place_id,
        name: name,
        address: address,
        latitude: lat,
        longitude: lng,
      });

      navigation.navigate('HomeTab');
    } else {
      console.error('No details available for selected place');
    }
  };

  console.log(storeLocationDetails)

  const handleSelectAddressCard = (selectedAddress) => {
    if (selectedAddress) {
      const { latitude, longitude, name, address } = selectedAddress;
  
      storeLocationDetails({
        placeId: selectedAddress._id, // Use the address ID as placeId
        name: name || 'Unknown',
        address: address || 'No address available',
        latitude: latitude || 0,
        longitude: longitude || 0,
      });
      navigation.navigate('HomeTab'); // Navigate to HomeTab after saving
    } else {
      console.error('No address selected');
    }
  };
  

  const handleSetPrimary = async addressId => {
    setLoading(true);
    try {
      const response = await setPrimaryAddress(user?.id, addressId);
      console.log(response);
      Alert.alert('Success', 'Address set as primary');
    } catch (error) {
      console.error('Error during Set Primary Address', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = addressId => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await deleteAddress(addressId);
              console.log(response);
  
              // Remove the deleted address from the state
              setAddresses(prevAddresses => 
                prevAddresses.filter(address => address._id !== addressId)
              );
  
              // Alert.alert('Delete', 'Address deleted successfully');
            } catch (error) {
              console.error('Error during address deletion', error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  


  const handleEdit = address => {
    navigation.navigate('MapScreen', { addressToEdit: address });
  };


  return (
    <>
      {!user?.token && (
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={require('../../assets/images/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Select Address</Text>
          </View>
          <AuthPrompt navigation={navigation} />
        </View>
      )}

      {user?.token && (
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={require('../../assets/images/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Select Address</Text>
          </View>
          <View style={styles.searchBox}>
            {/* <Image
              source={require('../../assets/images/search_icon.png')}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search saved addresses"
              placeholderTextColor={Colors.BLACK}
            /> */}

            <GooglePlacesAutocomplete
              placeholder="Search for a place"
              onPress={(data, details = null) => {
                if (details) {
                  handleAutoPlaceSelect(details);
                } else {
                  console.error('No details available for selected place');
                }
              }}
              query={{
                key: 'AIzaSyD0Svh7_EkCQypWAEn8aT6aWrYmwetPqgA',
                language: 'en',
                components: 'country:in',
              }}
              fetchDetails={true}
              styles={{
                container: styles.searchContainer,
                textInput: styles.searchInput,
                listView: styles.listView,
                predefinedPlacesDescription: styles.predefinedPlacesDescription,
              }}
              textInputProps={{
                placeholderTextColor: Colors.GRAY
              }}
              onChangeText={text => setSearchInput(text)}
              renderLeftButton={() => (
                <View style={styles.searchIconContainer}>
                  <Image
                    source={require('../../assets/images/search_icon.png')}
                    style={styles.searchIcon}
                  />
                </View>
              )}
              renderRow={rowData => (
                <View style={styles.resultRow}>
                  <Image
                    source={require('../../assets/images/location.png')}
                    style={styles.resultImage}
                  />
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.resultPrimaryText}>
                      {rowData.structured_formatting.main_text}
                    </Text>
                    <Text style={styles.resultSecondaryText}>
                      {rowData.structured_formatting.secondary_text}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          <View style={styles.optionsBox}>
            {/* <TouchableOpacity
              style={styles.optionItem}
              onPress={getCurrentLocation}>
              <Image
                source={require('../../assets/images/gps.png')}
                style={styles.optionIcon}
              />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Use Current Location</Text>
              </View>
            </TouchableOpacity> */}

            {/* <View style={styles.separator} /> */}

            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => navigation.navigate('MapScreen')}>
              <View style={styles.optionTextContainerAddAddress}>
                <Image
                  source={require('../../assets/icons/add_address.png')}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionText}>Add Address</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* FlatList for displaying addresses */}
          <FlatList
      data={addresses}
      keyExtractor={item => item._id}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => handleSelectAddressCard(item)} style={styles.addressItem}>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressType}>
              {item.type} {item?.type === 'Other' && ` - ${item?.otherName}`}
            </Text>
            <Text style={styles.nearbyLandmark}>{item?.landmark}</Text>
            <Text style={styles.addressDetails}>{item.address}</Text>
          </View>
          <View style={styles.addressActions}>
            <TouchableOpacity onPress={() => toggleMenu(index)}>
              <Image
                source={require('../../assets/images/dots.png')}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
            {menuVisible === index && (
              <View style={styles.menu}>
                <TouchableOpacity onPress={() => { handleEdit(item); setMenuVisible(null); }} style={styles.menuItem}>
                  {/* <Image source={require('../../assets/images/edit.png')} style={styles.menuIcon} /> */}
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleDelete(item._id); setMenuVisible(null); }} style={styles.menuItem}>
                  {/* <Image source={require('../../assets/images/delete.png')} style={styles.menuIcon} /> */}
                  <Text style={styles.DeletemenuText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        loading ? (
          <Text>Loading...</Text>
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
          {selectedAddress && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => setSelectedAddress(null)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Edit Address</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={selectedAddress.address}
                    onChangeText={text =>
                      setSelectedAddress({...selectedAddress, address: text})
                    }
                  />
                  <View style={styles.modalActions}>
                    <Button
                      title="Cancel"
                      onPress={() => setSelectedAddress(null)}
                    />
                    <Button
                      title="Save"
                      onPress={() => {
                        /* Save logic */
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 20,
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
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    color: Colors.BLACK,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 10,
  },
  searchInput: {
    color: Colors.BLACK,
    flex: 1,
    height: 40,
    fontFamily: 'Montserrat-Regular',
  },
  optionsBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  optionIcon: {
    width: 24,
    height: 24,
  },
  optionTextContainer: {
    marginLeft: 10,
  },
  optionTextContainerAddAddress: {
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 16,
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-SemiBold',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Montserrat-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  flatListContent: {
    paddingHorizontal: 20, // Adds padding to the left and right sides
    flexGrow: 1, // Ensures the list grows to fill the available space
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  addressIcon: {
    marginRight: 10,
  },
  addressTypeIcon: {
    width: 24,
    height: 24,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-SemiBold',
  },
  nearbyLandmark: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Montserrat-Regular',
  },
  addressDetails: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Montserrat-Regular',
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
  noAddressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noAddressText: {
    fontSize: 18,
    color: 'gray',
  },
  noAddressIcon: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  DeletemenuText: {
    fontSize: 16,
    color: Colors.RED,
    fontFamily: 'Montserrat-Regular',
  },
  resultImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  resultPrimaryText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    width: 320,
    color: Colors.BLACK
  },
  resultSecondaryText: {
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    width: 280,
  },
});
