import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/onboard1.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Content Heading #1</Text>
        <Text style={styles.subheading}>Content Sub Heading #1</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  imageContainer: {
    height: '65%',
    borderBottomRightRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: 'Montserrat-Bold',
    color: Colors.HEADING,
  },
  subheading: {
    fontSize: 20,
    color: Colors.HEADING,
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    height: 75,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
});

export default WelcomeScreen;
