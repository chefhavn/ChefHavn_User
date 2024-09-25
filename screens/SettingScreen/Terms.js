import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../utils/Colors';

const Terms = ({ navigation }) => {
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
        <Text style={styles.screenTitle}>Terms and Conditions</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to Chef Havn</Text>
        <Text style={styles.text}>
          Please read these terms and conditions ("Terms", "Terms and Conditions") carefully before using the Chef Havn mobile application operated by Chef Havn ("us", "we", or "our").
        </Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
        </Text>

        <Text style={styles.sectionTitle}>2. Service Availability</Text>
        <Text style={styles.text}>
          Chef Havn reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Chef Havn will not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
        </Text>

        <Text style={styles.sectionTitle}>3. Booking and Payment</Text>
        <Text style={styles.text}>
          By booking a chef through Chef Havn, you agree to provide accurate information during the booking process. Payments are processed through our secure payment partners, and all transactions must be completed before the service date.
        </Text>

        <Text style={styles.sectionTitle}>4. Cancellation Policy</Text>
        <Text style={styles.text}>
          If you wish to cancel a booking, please refer to our cancellation policy. Cancellations made less than 24 hours before the event may not be eligible for a full refund.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.text}>
          Chef Havn shall not be held responsible for any direct or indirect damages resulting from the use of the Service, including but not limited to the conduct of the chefs or any issues during the event.
        </Text>

        <Text style={styles.sectionTitle}>6. Governing Law</Text>
        <Text style={styles.text}>
          These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about these Terms, please contact us at info@chefhavn.com.
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
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.PRIMARY,
  },
  text: {
    fontSize: 14,
    color: Colors.DARK_GRAY,
    marginTop: 10,
    lineHeight: 20,
  },
});

export default Terms;
