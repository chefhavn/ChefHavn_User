import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../utils/Colors';

const Privacy = ({ navigation }) => {
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
        <Text style={styles.screenTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.text}>
          This Privacy Policy describes how Chef Havn collects, uses, and discloses your Personal Information when you visit or make a purchase from our website.
        </Text>

        <Text style={styles.sectionTitle}>Information We Collect</Text>
        <Text style={styles.text}>
          We collect information such as your name, email address, phone number, and payment information when you make a purchase or attempt to make a purchase through our website.
        </Text>

        <Text style={styles.sectionTitle}>How We Use Your Information</Text>
        <Text style={styles.text}>
          We use your information to process your orders, communicate with you, and provide you with the best possible service.
        </Text>

        <Text style={styles.sectionTitle}>Sharing Your Information</Text>
        <Text style={styles.text}>
          We do not share your personal information with third parties, except as necessary to fulfill your orders and provide our services.
        </Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginTop: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    lineHeight: 24,
  },
});

export default Privacy;
