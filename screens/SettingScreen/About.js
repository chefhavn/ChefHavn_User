import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../utils/Colors';

const About = ({ navigation }) => {
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
        <Text style={styles.screenTitle}>About Us</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require('../../assets/images/Chef-Logo-2.png')}
          style={styles.logo}
        />
        <Text style={styles.tagline}>Your Personal Chef for Every Occasion</Text>

        <Text style={styles.description}>
          At Chef Havn, we specialize in providing skilled and professional chefs
          for your small events, whether it's a family gathering, intimate dinner
          party, or a special celebration. Our chefs are carefully selected to 
          bring a culinary experience tailored to your specific needs.
        </Text>

        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <Text style={styles.bulletPoint}>• Experienced chefs for small events</Text>
        <Text style={styles.bulletPoint}>• Customized menus to suit your preferences</Text>
        <Text style={styles.bulletPoint}>• Hassle-free booking process</Text>
        <Text style={styles.bulletPoint}>• Affordable pricing</Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.description}>
          Our mission is to make dining at home special, by bringing professional chefs
          to your doorstep for your small gatherings. We believe in creating memorable
          experiences through personalized service and exceptional culinary skills.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.description}>
          Have any questions or want to know more about our services? Feel free to reach
          out to us at info@chefhavn.com or call us at (123) 456-7890.
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
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  bulletPoint: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    marginVertical: 5,
    fontFamily: 'Montserrat-Regular',
  },
});

export default About;
