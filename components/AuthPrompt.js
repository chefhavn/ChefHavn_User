import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Colors from '../utils/Colors';
import {UserContext} from '../context/UserContext';

const AuthPrompt = ({navigation}) => {
  const {logoutUser} = useContext(UserContext);

  const handleAuthNavigation = () => {
    logoutUser();
    navigation.navigate('Auth');
  };

  return (
    <View>

      <Text style={styles.infoText}>
        Please login or sign up to select an address or book a chef.
      </Text>

      <TouchableOpacity
        style={styles.authButton}
        onPress={handleAuthNavigation}>
        <Text style={styles.authButtonText}>Go to Login / Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  authButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AuthPrompt;
