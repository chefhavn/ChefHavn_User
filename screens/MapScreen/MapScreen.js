import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {BottomSheet} from 'react-native-elements';
import {UserContext} from '../../context/UserContext';
import Colors from '../../utils/Colors';
import {LocationContext} from '../../context/LocationContext';
import {addAddress, updateAddress} from '../../services/api';
import GetLocation from 'react-native-get-location'


export default function MapScreen({navigation, route}) {
  const {user} = useContext(UserContext);
  const {storeLocationDetails} = useContext(LocationContext);
  const {addressToEdit} = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: addressToEdit?.latitude || 17.4065,
    longitude: addressToEdit?.longitude || 78.4772,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    name: addressToEdit?.name || '',
    address: addressToEdit?.address || '',
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [receiverName, setReceiverName] = useState(user?.name || '');
  const [receiverContact, setReceiverContact] = useState(user?.phone || '');
  const [flatNo, setFlatNo] = useState(addressToEdit?.flat || '');
  const [nearbyLandmark, setNearbyLandmark] = useState(
    addressToEdit?.landmark || '',
  );
  const [areaLocality, setAreaLocality] = useState(addressToEdit?.area || '');
  const [addressType, setAddressType] = useState(addressToEdit?.type || 'Home');
  const [searchInput, setSearchInput] = useState('');
  const [showGpsIcon, setShowGpsIcon] = useState(true);
  const [otherName, setOtherName] = useState(addressToEdit?.otherName || '');

  useEffect(() => {
    if (!addressToEdit) {
      const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
      requestLocationPermission();
    }
  }, [addressToEdit]);

  const getCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setRegion(prevRegion => ({
              ...prevRegion,
              latitude,
              longitude,
            }));
            setSelectedLocation({latitude, longitude});
          },
          error => {
            console.warn('Error fetching location:', error);
            Alert.alert('Error', 'Unable to fetch location');
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } else {
        Alert.alert('Permission Denied', 'Location permission was denied');
      }
    } catch (err) {
      console.warn('Error in getCurrentLocation:', err);
    }
  };

  const handleSelectLocation = event => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleSaveAddress = async () => {
    if (!flatNo || !areaLocality) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    const otherNameValue = addressType === 'Other' ? otherName : '';

    const updatedAddress = {
      userId: user.id,
      name: region.name,
      address: region.address,
      flat: flatNo,
      area: areaLocality,
      landmark: nearbyLandmark,
      type: addressType,
      otherName: otherNameValue,
      latitude: selectedLocation?.latitude || region.latitude,
      longitude: selectedLocation?.longitude || region.longitude,
    };

    try {
      if (addressToEdit) {
        await updateAddress(addressToEdit?._id, updatedAddress);
        Alert.alert('Success', 'Address updated successfully');
      } else {
        // Add new address
        await addAddress(
          user.id,
          region.name,
          region.address,
          flatNo,
          areaLocality,
          nearbyLandmark,
          addressType,
          otherNameValue,
          region.latitude,
          region.longitude,
        );
        Alert.alert('Success', 'Address saved successfully');
      }
      setDrawerVisible(false);
      resetAddressFields();
    } catch (error) {
      Alert.alert('Error', 'Failed to save address. Please try again.');
    }
  };

  const resetAddressFields = () => {
    setReceiverName('');
    setReceiverContact('');
    setFlatNo('');
    setNearbyLandmark('');
    setAreaLocality('');
    setOtherName('');
    setAddressType('Home');
    navigation.navigate('HomeTab');
  };

  useEffect(() => {
    setShowGpsIcon(searchInput.trim() === '');
  }, [searchInput]);

  const handleAutoPlaceSelect = (data, details = null) => {
    if (details) {
      storeLocationDetails({
        placeId: details.place_id,
        name: details.name,
        address: details.formatted_address,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
      setRegion({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
        name: details.name,
        address: details.formatted_address,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>
          {addressToEdit ? 'Edit Address' : 'Select Address'}
        </Text>
      </View>

      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={handleAutoPlaceSelect}
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

      <MapView
        style={styles.map}
        onPress={handleSelectLocation}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        region={region}>
        {selectedLocation && (
          <Marker title="Selected Location" coordinate={selectedLocation} />
        )}
      </MapView>

      {showGpsIcon && (
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}>
          <Image
            source={require('../../assets/icons/gps_white.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addDetailsButton}
          onPress={() => setDrawerVisible(true)}>
          <Text style={styles.addDetailsButtonText}>Add More Details</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet isVisible={drawerVisible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.drawerContainer}>
          <ScrollView>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDrawerVisible(false)}>
                <Image
                  source={require('../../assets/icons/close.png')}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>
              {addressToEdit
                ? 'Edit complete address'
                : 'Enter complete address'}
            </Text>

            <Text style={styles.label}>Save address as *</Text>
            <View style={styles.addressTypeContainer}>
              {['Home', 'Other'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.addressTypeButton,
                    addressType === type && styles.selectedAddressTypeButton,
                  ]}
                  onPress={() => setAddressType(type)}>
                  <Text
                    style={[
                      styles.addressTypeText,
                      addressType === type && styles.selectedAddressTypeText,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {addressType === 'Other' && (
              <TextInput
                style={styles.input}
                value={otherName}
                placeholder="Enter custom address name"
                placeholderTextColor={Colors.GRAY}
                onChangeText={setOtherName}
              />
            )}

            <TextInput
              style={styles.input}
              value={flatNo}
              placeholder="Flat / House no / Floor / Building *"
              placeholderTextColor={Colors.GRAY}
              onChangeText={setFlatNo}
            />
            <TextInput
              style={styles.input}
              value={nearbyLandmark}
              placeholder="Nearby landmark (optional)"
              placeholderTextColor={Colors.GRAY}
              onChangeText={setNearbyLandmark}
            />
            <TextInput
              style={styles.input}
              value={areaLocality}
              placeholder="Area / Locality / Sector *"
              placeholderTextColor={Colors.GRAY}
              onChangeText={setAreaLocality}
            />

            <TouchableOpacity
              style={styles.saveAddressButton}
              onPress={handleSaveAddress}>
              <Text style={styles.saveAddressButtonText}>
                {addressToEdit ? 'Update Address' : 'Save Address'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  saveAddressButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveAddressButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold'
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
    color: Colors.BLACK,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
  },
  searchContainer: {
    position: 'absolute',
    width: '95%',
    zIndex: 1,
    top: 80,
    alignSelf: 'center',
  },
  listView: {
    marginTop: 10,
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 48,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular'
  },
  resultRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  resultTextContainer: {
    flex: 1,
    flexDirection: 'column',
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
    width: 320,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 140,
    right: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  addDetailsButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addDetailsButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  confirmButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  drawerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 0,
  },
  closeButton: {
    padding: 5,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 18,
    color: Colors.BLACK,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold'
  },
  receiverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  receiverIcon: {
    width: 30,
    height: 30,
  },
  receiverText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#F0F0F0',
    padding: 5,
    borderRadius: 5,
  },
  editText: {
    color: '#58abe7',
    fontSize: 14,
  },
  label: {
    color: Colors.BLACK,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular'
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    marginBottom: 20,
  },
  addressTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    // backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  selectedAddressTypeButton: {
    backgroundColor: Colors.PRIMARY,
  },
  addressTypeText: {
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular'
  },
  selectedAddressTypeText: {
    color: Colors.WHITE,
    fontFamily: 'Montserrat-Regular'
  },
  selectedAddressContainer: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedAddressText: {
    color: '#333',
    fontSize: 14,
  },
  changeButton: {
    // backgroundColor: Colors.PRIMARY,
    padding: 5,
    borderRadius: 5,
  },
  changeButtonText: {
    color: Colors.PRIMARY,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    height: 50,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular'
  },
  confirmButtonEnabled: {
    backgroundColor: Colors.PRIMARY,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
