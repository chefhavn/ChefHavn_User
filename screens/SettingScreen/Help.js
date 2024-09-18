import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Colors from '../../utils/Colors';

const Help = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const handleMailPress = () => {
    const email = 'mailto:test@gmail.com';
    Linking.openURL(email).catch(err =>
      Alert.alert('Error', 'Unable to open email client.')
    );
  };

  const handleCallPress = () => {
    const phone = 'tel:+1234567890';
    Linking.openURL(phone).catch(err =>
      Alert.alert('Error', 'Unable to make the call.')
    );
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
        <Text style={styles.screenTitle}>Help</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Here you can configure your Help.</Text>

        {/* Mail Us Button */}
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Mail Us</Text>
        </TouchableOpacity>

        {/* Call Us Button */}
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Call Us</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Help;
