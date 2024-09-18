// SplashScreen.jsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Chef-Logo-2.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
