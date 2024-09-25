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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Help</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../../assets/images/slider/cat-1.png')} // Add a relevant illustration or banner here
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>Need Assistance? We’re here to help!</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Mail Us Card */}
        <TouchableOpacity style={styles.card} onPress={handleMailPress}>
          <Image
            source={require('../../assets/images/mail-50x50.png')} // Replace with your 30x30 px icon
            style={styles.icon}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Mail Us</Text>
            <Text style={styles.cardSubTitle}>
              Reach out to us via email for any queries or support.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Call Us Card */}
        <TouchableOpacity style={styles.card} onPress={handleCallPress}>
          <Image
            source={require('../../assets/images/call.png')} // Replace with your 30x30 px icon
            style={styles.icon}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Call Us</Text>
            <Text style={styles.cardSubTitle}>
              Contact us directly for immediate assistance.
            </Text>
          </View>
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
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_BLUE,
    // paddingVertical: 30,
    paddingHorizontal: 10,
  },
  bannerImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  cardSubTitle: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
  },
});

export default Help;
