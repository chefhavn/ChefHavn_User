import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../utils/Colors';

const Settings = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Settings</Text>
      </View>

      {/* Top Art Content */}
      <View style={styles.artContainer}>
        {/* <Image
          source={require('../../assets/images/art.png')} // Replace with your art image
          style={styles.artImage}
          resizeMode="cover"
        /> */}
      </View>

      <ScrollView contentContainerStyle={styles.menuListContainer}>
        {/* Saved Address */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('SavedAddresses')}>
          <View style={styles.menuContent}>
            <Image
              source={require('../../assets/images/location.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Saved Address</Text>
          </View>
          <Image
            source={require('../../assets/images/forward.png')}
            style={styles.forwardIcon}
          />
        </TouchableOpacity>

        {/* Edit Profile */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.menuContent}>
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Edit Profile</Text>
          </View>
          <Image
            source={require('../../assets/images/forward.png')}
            style={styles.forwardIcon}
          />
        </TouchableOpacity>

        {/* Raise a Bug / Suggestion */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('BugSuggestion')}>
          <View style={styles.menuContent}>
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Raise a Bug / Suggestion</Text>
          </View>
          <Image
            source={require('../../assets/images/forward.png')}
            style={styles.forwardIcon}
          />
        </TouchableOpacity>

        {/* Notification Settings */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('NotificationSettings')}>
          <View style={styles.menuContent}>
            <Image
              source={require('../../assets/images/notifications.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Notification Settings</Text>
          </View>
          <Image
            source={require('../../assets/images/forward.png')}
            style={styles.forwardIcon}
          />
        </TouchableOpacity>

        {/* Delete Your Account */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('DeleteAccount')}>
          <View style={styles.menuContent}>
            <Image
              source={require('../../assets/images/delete.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Delete Your Account</Text>
          </View>
          <Image
            source={require('../../assets/images/forward.png')}
            style={styles.forwardIcon}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.WHITE,
    elevation: 2, // Add a shadow effect
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  screenTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.BLACK,
  },
  artContainer: {
    height: 150, // Set the height of the art section
    backgroundColor: Colors.LIGHT_GRAY, // Background color for the art container
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space below the art container
    borderBottomWidth: 2, // Border at the bottom
    borderBottomColor: Colors.DARK_GRAY,
  },
  artImage: {
    width: '100%', // Take full width
    height: '100%', // Take full height
  },
  menuListContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8, // Add vertical spacing between menu items
    borderRadius: 8, // Rounded corners
    backgroundColor: Colors.WHITE, // Background color for menu items
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
    elevation: 1, // Add a slight shadow
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  forwardIcon: {
    width: 16,
    height: 16,
  },
});

export default Settings;
